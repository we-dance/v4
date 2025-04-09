import Stripe from 'stripe'
import { prisma } from '~/server/prisma'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

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

export const stripeService = {
  // Get or create a Stripe customer
  async getOrCreateCustomer(userId: string, email: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        profile: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        stripeCustomerId: { not: null },
      },
    })

    if (subscription?.stripeCustomerId) {
      return subscription.stripeCustomerId
    }

    const customer = await stripe.customers.create({
      email: user.email || email,
      name: user.profile?.name || undefined,
      metadata: {
        userId,
      },
    })

    return customer.id
  },

  async getOrCreateProduct(course: any) {
    const products = await stripe.products.list({
      limit: 100,
      active: true,
    })

    const existingProduct = products.data.find(
      (product) => product.metadata.courseId === course.id
    )

    if (existingProduct) {
      return existingProduct.id
    }

    const product = await stripe.products.create({
      name: course.name,
      description: course.description || undefined,
      images: course.imageUrl ? [course.imageUrl] : undefined,
      metadata: {
        courseId: course.id,
      },
    })

    return product.id
  },

  async getOrCreatePrice(offering: any, productId: string) {
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
      product: productId,
    })

    const existingPrice = prices.data.find(
      (price) => price.metadata.offeringId === offering.id
    )

    if (existingPrice) {
      return existingPrice.id
    }

    const interval = convertDurationToInterval(offering.duration)

    const price = await stripe.prices.create({
      product: productId,
      unit_amount: offering.price,
      currency: offering.currency || 'EUR',
      recurring: {
        interval: interval,
      },
      lookup_key: `offering_${offering.id}`,
      nickname: offering.name,
      metadata: {
        courseId: offering.courseId,
        offeringId: offering.id,
      },
    })

    return price.id
  },

  async createCheckoutSession(params: {
    userId: string
    email: string
    courseId: string
    offeringId: string
    successUrl: string
    cancelUrl: string
  }) {
    const { userId, email, courseId, offeringId, successUrl, cancelUrl } =
      params

    const customerId = await this.getOrCreateCustomer(userId, email)

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        offers: {
          where: { id: offeringId },
        },
      },
    })

    if (!course) {
      throw new Error('Course not found')
    }

    const offering = course.offers[0]
    if (!offering) {
      throw new Error('Course offering not found')
    }

    const productId = await this.getOrCreateProduct(course)
    const priceId = await this.getOrCreatePrice(offering, productId)

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        courseId,
        offeringId,
      },
    })
    return session
  },

  async cancelSubscription(subscriptionId: string) {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
  },

  async getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId)
  },

  async getCheckoutSession(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data'],
    })

    const lineItem = session.line_items?.data?.[0]
    const priceId = lineItem?.price?.id

    return {
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      stripePriceId: priceId,
    }
  },
}
