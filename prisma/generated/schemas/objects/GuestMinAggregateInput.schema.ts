import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    profileId: z.literal(true).optional(),
    eventId: z.literal(true).optional(),
    role: z.literal(true).optional(),
    status: z.literal(true).optional(),
    invitedAt: z.literal(true).optional(),
    confirmedAt: z.literal(true).optional(),
    cancelledAt: z.literal(true).optional(),
    registeredAt: z.literal(true).optional(),
    waitlistedAt: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const GuestMinAggregateInputObjectSchema = Schema
