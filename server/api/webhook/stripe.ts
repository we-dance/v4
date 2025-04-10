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
    return {
      error: 'stripe.webhooks.constructEvent: ' + (err as Error).message,
    }
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const checkoutSession = stripeEvent.data.object

      if (!checkoutSession.metadata.subscriptionId) {
        return { error: 'Subscription ID not found' }
      }

      const stripeAccount = checkoutSession.metadata.stripeAccount

      const stripeSubscription = await stripe.subscriptions.retrieve(
        checkoutSession.subscription,
        {
          stripeAccount,
        }
      )
      const nextBillingDate = new Date(
        stripeSubscription.items.data[0].current_period_end * 1000
      )

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
