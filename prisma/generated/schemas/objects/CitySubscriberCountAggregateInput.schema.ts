import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    cityId: z.literal(true).optional(),
    profileId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const CitySubscriberCountAggregateInputObjectSchema = Schema
