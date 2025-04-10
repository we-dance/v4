import Stripe from 'stripe'

export function getStripe() {
  return new Stripe(useRuntimeConfig().stripeSecretKey, {
    apiVersion: '2025-03-31.basil',
  })
}
