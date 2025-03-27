import { defineEventHandler, readBody } from 'h3'
import Stripe from 'stripe'
import { prisma } from '~/server/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
])

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sig = event.headers.get('stripe-signature') as string

  let stripeEvent: Stripe.Event

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err)
    return { success: false, message: 'Webhook signature verification failed' }
  }

  // Handle only relevant events
  if (relevantEvents.has(stripeEvent.type)) {
    try {
      switch (stripeEvent.type) {
        case 'checkout.session.completed': {
          const session = stripeEvent.data.object as Stripe.Checkout.Session
          await handleCheckoutSessionCompleted(session)
          break
        }
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = stripeEvent.data.object as Stripe.Subscription
          await handleSubscriptionUpdated(subscription)
          break
        }
        case 'customer.subscription.deleted': {
          const subscription = stripeEvent.data.object as Stripe.Subscription
          await handleSubscriptionDeleted(subscription)
          break
        }
        case 'invoice.payment_succeeded': {
          const invoice = stripeEvent.data.object as Stripe.Invoice
          await handleInvoicePaymentSucceeded(invoice)
          break
        }
        case 'invoice.payment_failed': {
          const invoice = stripeEvent.data.object as Stripe.Invoice
          await handleInvoicePaymentFailed(invoice)
          break
        }
        default:
          console.warn(`Unhandled relevant event: ${stripeEvent.type}`)
      }
    } catch (error) {
      console.error(`Error handling Stripe webhook: ${error}`)
      return { success: false, message: 'Error handling webhook' }
    }
  }

  return { success: true }
})

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  if (
    session.subscription &&
    session.customer &&
    session.metadata?.userId &&
    session.metadata?.courseId
  ) {
    // Get the subscription details
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Get the course offering details
    const courseId = session.metadata.courseId
    const offeringId = session.metadata.offeringId

    // Get course and offering info
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        offerings: offeringId
          ? {
              where: { id: offeringId },
            }
          : true,
      },
    })

    if (!course) {
      console.error(`Course not found: ${courseId}`)
      return
    }

    const offering = offeringId
      ? course.offerings.find((o) => o.id === offeringId)
      : course.offerings[0]

    if (!offering) {
      console.error(`Offering not found for course: ${courseId}`)
      return
    }

    // Create subscription in your database
    await prisma.subscription.create({
      data: {
        userId: session.metadata.userId,
        name: `${course.name} Subscription`,
        plan: offering.name,
        price: offering.price,
        currency: offering.currency,
        interval: convertDurationToInterval(offering.duration),
        status: subscription.status,
        nextBillingDate: new Date(subscription.current_period_end * 1000),
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0]?.price.id,
      },
    })

    // Create course enrollment
    await prisma.courseEnrollment.create({
      data: {
        userId: session.metadata.userId,
        courseId: courseId,
        isActive: true,
      },
    })
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Update subscription in your database
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      stripeSubscriptionId: subscription.id,
    },
  })

  if (existingSubscription) {
    await prisma.subscription.update({
      where: {
        id: existingSubscription.id,
      },
      data: {
        status: subscription.status,
        nextBillingDate: new Date(subscription.current_period_end * 1000),
      },
    })
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Update subscription status in your database
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      stripeSubscriptionId: subscription.id,
    },
  })

  if (existingSubscription) {
    await prisma.subscription.update({
      where: {
        id: existingSubscription.id,
      },
      data: {
        status: 'canceled',
        canceledAt: new Date(),
      },
    })
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    // Update next billing date
    const subscription = await prisma.subscription.findFirst({
      where: {
        stripeSubscriptionId: invoice.subscription as string,
      },
    })

    if (subscription) {
      await prisma.subscription.update({
        where: {
          id: subscription.id,
        },
        data: {
          status: 'active',
          nextBillingDate: new Date((invoice.period_end + 86400) * 1000), // Add a day
        },
      })
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    // Update subscription status
    const subscription = await prisma.subscription.findFirst({
      where: {
        stripeSubscriptionId: invoice.subscription as string,
      },
    })

    if (subscription) {
      await prisma.subscription.update({
        where: {
          id: subscription.id,
        },
        data: {
          status: 'past_due',
        },
      })
    }
  }
}

// Helper function to convert duration to Stripe interval
function convertDurationToInterval(
  duration: string
): 'day' | 'week' | 'month' | 'year' {
  if (!duration) return 'month' // Default

  const durationLower = duration.toLowerCase()

  if (durationLower === 'monthly' || durationLower.includes('month'))
    return 'month'
  if (
    durationLower === 'yearly' ||
    durationLower.includes('year') ||
    durationLower === 'annual' ||
    durationLower.includes('annual')
  )
    return 'year'
  if (durationLower === 'weekly' || durationLower.includes('week'))
    return 'week'
  if (durationLower === 'daily' || durationLower.includes('day')) return 'day'

  return 'month' // Default to monthly if no match
}
