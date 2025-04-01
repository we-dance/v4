import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    followerId: z.literal(true).optional(),
    profileId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const ProfileFollowerCountAggregateInputObjectSchema = Schema
