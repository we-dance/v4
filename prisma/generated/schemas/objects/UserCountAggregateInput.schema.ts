import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    email: z.literal(true).optional(),
    name: z.literal(true).optional(),
    firstName: z.literal(true).optional(),
    lastName: z.literal(true).optional(),
    phone: z.literal(true).optional(),
    emailConsent: z.literal(true).optional(),
    emailConsentAt: z.literal(true).optional(),
    salt: z.literal(true).optional(),
    hash: z.literal(true).optional(),
    firebaseId: z.literal(true).optional(),
    emailVerified: z.literal(true).optional(),
    isDeleted: z.literal(true).optional(),
    deletedAt: z.literal(true).optional(),
    deletedReason: z.literal(true).optional(),
    notificationSettings: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    lastLoginAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const UserCountAggregateInputObjectSchema = Schema
