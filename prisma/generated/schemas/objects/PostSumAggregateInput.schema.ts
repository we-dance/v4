import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostSumAggregateInputType> = z
  .object({
    styleId: z.literal(true).optional(),
    upvotes: z.literal(true).optional(),
    commentsCount: z.literal(true).optional(),
  })
  .strict()

export const PostSumAggregateInputObjectSchema = Schema
