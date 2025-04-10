import Stripe from 'stripe'
import { H3Event } from 'h3'

export function getStripe(event: H3Event) {
  return new Stripe(useRuntimeConfig(event).stripeSecretKey, {
    apiVersion: '2025-03-31.basil',
  })
}
