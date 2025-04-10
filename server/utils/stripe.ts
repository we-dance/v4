import Stripe from 'stripe'

export const stripe = new Stripe(useRuntimeConfig().stripeSecretKey, {
  apiVersion: '2025-03-31.basil',
})
