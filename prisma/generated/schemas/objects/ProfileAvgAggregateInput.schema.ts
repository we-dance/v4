import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileAvgAggregateInputType> = z
  .object({
    lng: z.literal(true).optional(),
    lat: z.literal(true).optional(),
    followersCount: z.literal(true).optional(),
    followingCount: z.literal(true).optional(),
    viewsCount: z.literal(true).optional(),
    daysUsed: z.literal(true).optional(),
  })
  .strict()

export const ProfileAvgAggregateInputObjectSchema = Schema
