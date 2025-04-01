import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    price: z.literal(true).optional(),
    currency: z.literal(true).optional(),
    duration: z.literal(true).optional(),
    validFrom: z.literal(true).optional(),
    validThrough: z.literal(true).optional(),
    courseId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const OfferMinAggregateInputObjectSchema = Schema
