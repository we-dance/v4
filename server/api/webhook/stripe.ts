import { prisma } from '~/server/prisma'
import { getStripe } from '~/server/utils/stripe'

export default eventHandler(async (event) => {
  const body = await readRawBody(event, false)

  let stripeEvent: any = body

  const signature = getHeader(event, 'stripe-signature')

  if (!body) {
    return { error: 'Invalid request body' }
  }

  if (!signature) {
    return { error: 'Invalid stripe-signature' }
  }

  const stripe = getStripe()

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      useRuntimeConfig().stripeWebhookSecret
    )
  } catch (err) {
    const errorMessage =
      'stripe.webhooks.constructEvent: ' + (err as Error).message

    return {
      error: errorMessage,
    }
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const checkoutSession = stripeEvent.data.object

      // Handle ticket purchases
      if (checkoutSession.metadata.ticketPurchaseId) {
        const ticketPurchase = await prisma.ticketPurchase.findUnique({
          where: {
            id: checkoutSession.metadata.ticketPurchaseId,
          },
          include: {
            event: true,
            user: {
              include: {
                profile: true,
              },
            },
          },
        })

        if (!ticketPurchase) {
          return { error: 'Ticket purchase not found' }
        }

        await prisma.ticketPurchase.update({
          where: { id: ticketPurchase.id },
          data: {
            status: 'completed',
            stripeCheckoutSessionId: checkoutSession.id,
            stripePaymentIntentId: checkoutSession.payment_intent,
          },
        })

        // Auto-create Guest record for the purchaser
        if (ticketPurchase.user.profile) {
          await prisma.guest.upsert({
            where: {
              profileId_eventId: {
                profileId: ticketPurchase.user.profile.id,
                eventId: ticketPurchase.eventId,
              },
            },
            update: {
              status: 'registered',
              registeredAt: new Date(),
            },
            create: {
              profileId: ticketPurchase.user.profile.id,
              eventId: ticketPurchase.eventId,
              role: 'attendee',
              status: 'registered',
              registeredAt: new Date(),
            },
          })
        }

        return { received: true }
      }

      // Handle course subscriptions
      if (!checkoutSession.metadata.subscriptionId) {
        return { error: 'Subscription ID not found' }
      }

      const stripeAccount = checkoutSession.metadata.stripeAccount

      let nextBillingDate: Date | null = null

      if (checkoutSession.subscription) {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          checkoutSession.subscription,
          {
            stripeAccount,
          }
        )

        nextBillingDate = new Date(
          stripeSubscription.items.data[0].current_period_end * 1000
        )
      }

      const subscription = await prisma.subscription.findUnique({
        where: {
          id: checkoutSession.metadata.subscriptionId,
        },
      })

      if (!subscription) {
        return { error: 'Subscription not found' }
      }

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: 'active',
          nextBillingDate,
          stripeSubscriptionId: checkoutSession.subscription,
        },
      })

      break
  }

  return { received: true }
})
