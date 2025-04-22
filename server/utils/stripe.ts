import Stripe from 'stripe'

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
