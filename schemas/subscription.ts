import * as z from 'zod'

export const subscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  plan: z.string(),
  price: z.number(),
  currency: z.string(),
  interval: z.string(), // 'month', 'year', etc.
  status: z.enum(['active', 'canceled', 'past_due']),
  nextBillingDate: z.coerce.date().nullable().optional(),
  canceledAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

// For creating a new subscription
export const createSubscriptionSchema = z.object({
  name: z.string(),
  plan: z.string(),
  price: z.number(),
  currency: z.string(),
  interval: z.string(),
  status: z.enum(['active', 'canceled', 'past_due']),
  nextBillingDate: z.coerce.date().nullable().optional(),
  canceledAt: z.coerce.date().nullable().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
})

// For updating subscription status (for cancellation)
export const updateSubscriptionStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'canceled', 'past_due']),
  canceledAt: z.coerce.date().optional(),
})

export type Subscription = z.infer<typeof subscriptionSchema>
export type CreateSubscription = z.infer<typeof createSubscriptionSchema>
export type UpdateSubscriptionStatus = z.infer<
  typeof updateSubscriptionStatusSchema
>
