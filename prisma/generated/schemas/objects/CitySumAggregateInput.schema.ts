import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySumAggregateInputType> = z
  .object({
    lat: z.literal(true).optional(),
    lng: z.literal(true).optional(),
    membersCount: z.literal(true).optional(),
    subscribersCount: z.literal(true).optional(),
    viewsCount: z.literal(true).optional(),
  })
  .strict()

export const CitySumAggregateInputObjectSchema = Schema
