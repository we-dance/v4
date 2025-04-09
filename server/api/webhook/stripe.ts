import Stripe from 'stripe'
import { prisma } from '~/server/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

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

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    )
  } catch (err) {
    return { error: err }
  }

  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const checkoutSession = stripeEvent.data.object

      if (!checkoutSession.metadata.subscriptionId) {
        return { error: 'Subscription ID not found' }
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
        data: { status: 'active' },
      })

      break
  }

  return { received: true }
})
