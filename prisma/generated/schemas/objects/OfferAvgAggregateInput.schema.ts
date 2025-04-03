import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferAvgAggregateInputType> = z
  .object({
    price: z.literal(true).optional(),
  })
  .strict()

export const OfferAvgAggregateInputObjectSchema = Schema
