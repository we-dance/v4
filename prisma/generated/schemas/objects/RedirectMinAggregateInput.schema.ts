import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.RedirectMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    from: z.literal(true).optional(),
    to: z.literal(true).optional(),
    note: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
  })
  .strict()

export const RedirectMinAggregateInputObjectSchema = Schema
