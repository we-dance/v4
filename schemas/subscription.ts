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
  nextBillingDate: z.date().nullable().optional(),
  canceledAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// For creating a new subscription
export const createSubscriptionSchema = subscriptionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

// For updating subscription status (for cancellation)
export const updateSubscriptionStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'canceled', 'past_due']),
  canceledAt: z.date().optional(),
})

export type Subscription = z.infer<typeof subscriptionSchema>
export type CreateSubscription = z.infer<typeof createSubscriptionSchema>
export type UpdateSubscriptionStatus = z.infer<
  typeof updateSubscriptionStatusSchema
>
