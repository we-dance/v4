import Stripe from 'stripe'
import { H3Event } from 'h3'

export function getStripe(stripeAccountId?: string | undefined) {
  return new Stripe(useRuntimeConfig().stripeSecretKey, {
    apiVersion: '2025-03-31.basil',
    stripeAccount: stripeAccountId,
  })
}
