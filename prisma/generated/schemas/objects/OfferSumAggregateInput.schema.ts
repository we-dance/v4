import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferSumAggregateInputType> = z
  .object({
    price: z.literal(true).optional(),
  })
  .strict()

export const OfferSumAggregateInputObjectSchema = Schema
