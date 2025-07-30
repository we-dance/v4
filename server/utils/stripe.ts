import Stripe from 'stripe'
import { SubscriptionDuration, getRecurring } from '~/utils/format'

export function getStripe(stripeAccountId?: string | null) {
  if (stripeAccountId) {
    return new Stripe(useRuntimeConfig().stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
      stripeAccount: stripeAccountId,
    })
  }

  return new Stripe(useRuntimeConfig().stripeSecretKey, {
    apiVersion: '2025-03-31.basil',
  })
}

interface StripeIds {
  stripeProductId: string
  stripePriceId: string
}

export interface OfferData {
  name: string
  price: number
  currency: string
  duration?: SubscriptionDuration
  items: string
  stripeProductId?: string
  stripePriceId?: string
}

export async function createOrUpdateStripeProduct(
  stripe: Stripe,
  newOffer: OfferData,
  oldOffer?: OfferData
): Promise<StripeIds> {
  if (!oldOffer?.stripeProductId) {
    const stripeProduct = await stripe.products.create({
      name: newOffer.name,
      description: newOffer.items ? newOffer.items : undefined,
    })
    const stripePrice = await stripe.prices.create({
      unit_amount: newOffer.price,
      currency: newOffer.currency,
      product: stripeProduct.id,
      recurring: newOffer.duration
        ? getRecurring(newOffer.duration)
        : undefined,
    })

    return {
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    }
  }

  if (!oldOffer.stripePriceId) {
    const stripePrice = await stripe.prices.create({
      unit_amount: newOffer.price,
      currency: newOffer.currency,
      product: oldOffer.stripeProductId,
      recurring: newOffer.duration
        ? getRecurring(newOffer.duration)
        : undefined,
    })

    return {
      stripeProductId: oldOffer.stripeProductId,
      stripePriceId: stripePrice.id,
    }
  }

  if (newOffer.name !== oldOffer.name || newOffer.items !== oldOffer.items) {
    await stripe.products.update(oldOffer.stripeProductId, {
      name: newOffer.name,
      description: newOffer.items ? newOffer.items : undefined,
    })
  }

  if (
    newOffer.price !== oldOffer.price ||
    newOffer.currency !== oldOffer.currency ||
    newOffer.duration !== oldOffer.duration
  ) {
    if (oldOffer.stripePriceId) {
      await stripe.prices.update(oldOffer.stripePriceId, {
        active: false,
      })
    }

    const newStripePrice = await stripe.prices.create({
      unit_amount: newOffer.price,
      currency: newOffer.currency,
      product: oldOffer.stripeProductId,
      recurring: newOffer.duration
        ? getRecurring(newOffer.duration)
        : undefined,
    })

    return {
      stripeProductId: oldOffer.stripeProductId,
      stripePriceId: newStripePrice.id,
    }
  }

  return {
    stripeProductId: oldOffer.stripeProductId,
    stripePriceId: oldOffer.stripePriceId,
  }
}
