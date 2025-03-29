import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = z
  .object({
    styleId: z.lazy(() => SortOrderSchema).optional(),
    upvotes: z.lazy(() => SortOrderSchema).optional(),
    commentsCount: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const PostSumOrderByAggregateInputObjectSchema = Schema
