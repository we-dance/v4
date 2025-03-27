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
    // Check if user already has a Stripe customer ID
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

    // Find existing subscriptions with a Stripe customer ID
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        stripeCustomerId: { not: null },
      },
    })

    // If we already have a Stripe customer ID, return it
    if (subscription?.stripeCustomerId) {
      return subscription.stripeCustomerId
    }

    // Otherwise, create a new customer in Stripe
    const customer = await stripe.customers.create({
      email: user.email || email,
      name: user.profile?.name || undefined,
      metadata: {
        userId,
      },
    })

    return customer.id
  },

  // Get or create a product for a course
  async getOrCreateProduct(course: any) {
    // Look up existing products in Stripe that match this course
    const products = await stripe.products.list({
      limit: 100,
      active: true,
    })

    // Find product with matching courseId in metadata
    const existingProduct = products.data.find(
      (product) => product.metadata.courseId === course.id
    )

    // If we found an existing product, return its ID
    if (existingProduct) {
      return existingProduct.id
    }

    // Otherwise, create a new product in Stripe
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

  // Get or create a price for a course offering
  async getOrCreatePrice(offering: any, productId: string) {
    // Look up existing prices for this product in Stripe that match this offering
    const prices = await stripe.prices.list({
      limit: 100,
      active: true,
      product: productId,
    })

    // Find price with matching offeringId in metadata
    const existingPrice = prices.data.find(
      (price) => price.metadata.offeringId === offering.id
    )

    // If we found an existing price, return its ID
    if (existingPrice) {
      return existingPrice.id
    }

    // Convert duration to proper interval format
    const interval = convertDurationToInterval(offering.duration)

    // Create a new price in Stripe
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: Math.round(offering.price * 100), // Convert to cents
      currency: offering.currency || 'USD',
      recurring: {
        interval: interval,
      },
      lookup_key: `offering_${offering.id}`, // This is a valid parameter
      nickname: offering.name,
      metadata: {
        courseId: offering.courseId,
        offeringId: offering.id,
      },
    })

    return price.id
  },

  // Create a checkout session for a course subscription
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

    // Get or create customer
    const customerId = await this.getOrCreateCustomer(userId, email)

    // Get course and offering details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        offerings: {
          where: { id: offeringId },
        },
      },
    })

    if (!course) {
      throw new Error('Course not found')
    }

    const offering = course.offerings[0]
    if (!offering) {
      throw new Error('Course offering not found')
    }

    // Get or create a product for this course
    const productId = await this.getOrCreateProduct(course)

    // Get or create a price for this offering
    const priceId = await this.getOrCreatePrice(offering, productId)

    // Create checkout session with proper success and cancel URLs
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
      // These URLs should come from the frontend and include the courseId
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

  // Handle cancellation of a subscription
  async cancelSubscription(subscriptionId: string) {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
  },

  // Retrieve subscription details from Stripe
  async getSubscription(subscriptionId: string) {
    return await stripe.subscriptions.retrieve(subscriptionId)
  },
}
