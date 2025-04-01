import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    winnerId: z.literal(true).optional(),
    loserId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    createdById: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const VoteCountAggregateInputObjectSchema = Schema
