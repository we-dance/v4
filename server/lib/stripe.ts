// server/lib/stripe.ts
import Stripe from 'stripe'
import { getAppUrl } from './organization'

export function getStripe(org: any) {
  if (!org) {
    throw new Error('Organization is required')
  }

  const stripeKey = String(process.env.STRIPE_SECRET_KEY)
  const stripe = new Stripe(stripeKey)

  const options = {
    stripeAccount: org.stripeAccountId,
  }

  return { stripe, options }
}

export async function createProduct(productData: any, org: any) {
  const product = { ...productData }

  if (product.stripeProductId) return

  const { stripe, options } = getStripe(org)

  const stripeProduct = await stripe.products.create(
    {
      name: product.name,
      description: product.description,
    },
    options
  )

  const stripePrice = await stripe.prices.create(
    {
      unit_amount: product.price * 100,
      currency: 'eur',
      product: stripeProduct.id,
    },
    options
  )

  const paymentLink = await stripe.paymentLinks.create(
    {
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: getAppUrl(org, '/'),
        },
      },
    },
    options
  )

  return {
    stripeProductId: stripeProduct.id,
    stripePriceId: stripePrice.id,
    paymentLink: paymentLink.url,
  }
}

export async function createSubscription(
  userId: string,
  planData: {
    name: string
    plan: string
    price: number
    currency: string
    interval: string
  },
  org: any
) {
  const { stripe, options } = getStripe(org)

  // Create a customer if not exists
  let customer
  const existingCustomers = await stripe.customers.list(
    {
      email: userId, // Assuming userId is email or you have email separately
      limit: 1,
    },
    options
  )

  if (existingCustomers.data.length > 0) {
    customer = existingCustomers.data[0]
  } else {
    customer = await stripe.customers.create(
      {
        email: userId, // You may want to pass actual email instead
        metadata: {
          userId: userId,
        },
      },
      options
    )
  }

  // Create a subscription product if it doesn't exist
  const productName = `${planData.name} - ${planData.plan} Plan`
  const productDescription = `${planData.interval} subscription for ${planData.name}`

  const products = await stripe.products.list(
    {
      limit: 1,
      active: true,
    },
    options
  )

  let product
  if (products.data.length > 0) {
    product = products.data[0]
  } else {
    product = await stripe.products.create(
      {
        name: productName,
        description: productDescription,
      },
      options
    )
  }

  // Create a price for the product
  const price = await stripe.prices.create(
    {
      unit_amount: planData.price * 100, // Convert to cents
      currency: planData.currency,
      recurring: {
        interval: planData.interval === 'annual' ? 'year' : 'month',
      },
      product: product.id,
    },
    options
  )

  // Create a checkout session
  const session = await stripe.checkout.sessions.create(
    {
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${getAppUrl(org, '/checkout')}/${userId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getAppUrl(org, '/checkout')}/${userId}/cancel`,
      metadata: {
        userId: userId,
        planName: planData.name,
        planType: planData.plan,
        interval: planData.interval,
      },
    },
    options
  )

  return {
    sessionId: session.id,
    url: session.url,
    customerId: customer.id,
    productId: product.id,
    priceId: price.id,
  }
}

// Add a function to handle subscription webhook events
export async function handleSubscriptionEvent(event: any, prisma: any) {
  const { type, data } = event

  if (type === 'checkout.session.completed') {
    const session = data.object

    if (session.mode === 'subscription') {
      const { userId, planName, planType, interval } = session.metadata

      // Create a subscription record in your database
      await prisma.subscription.create({
        data: {
          userId: userId,
          name: planName,
          plan: planType,
          price: session.amount_total / 100, // Convert from cents
          currency: session.currency,
          interval: interval,
          status: 'active',
          nextBillingDate: new Date(
            Date.now() +
              (interval === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000
          ),
        },
      })
    }
  } else if (type === 'invoice.payment_succeeded') {
    const invoice = data.object

    if (invoice.subscription) {
      // Update subscription next billing date
      const subscription = await prisma.subscription.findFirst({
        where: {
          stripeSubscriptionId: invoice.subscription,
        },
      })

      if (subscription) {
        await prisma.subscription.update({
          where: {
            id: subscription.id,
          },
          data: {
            status: 'active',
            nextBillingDate: new Date(invoice.lines.data[0].period.end * 1000),
          },
        })
      }
    }
  } else if (type === 'customer.subscription.deleted') {
    const subscription = data.object

    // Update subscription status in your database
    await prisma.subscription.updateMany({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        status: 'canceled',
        canceledAt: new Date(),
      },
    })
  }
}

// Add a function to retrieve subscription details
export async function getSubscription(subscriptionId: string, org: any) {
  const { stripe, options } = getStripe(org)

  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId,
    options
  )
  return subscription
}

// Add a function to cancel a subscription
export async function cancelSubscription(subscriptionId: string, org: any) {
  const { stripe, options } = getStripe(org)

  const subscription = await stripe.subscriptions.update(
    subscriptionId,
    { cancel_at_period_end: true },
    options
  )

  return subscription
}
