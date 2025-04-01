import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { PostCountOrderByAggregateInputObjectSchema } from './PostCountOrderByAggregateInput.schema'
import { PostAvgOrderByAggregateInputObjectSchema } from './PostAvgOrderByAggregateInput.schema'
import { PostMaxOrderByAggregateInputObjectSchema } from './PostMaxOrderByAggregateInput.schema'
import { PostMinOrderByAggregateInputObjectSchema } from './PostMinOrderByAggregateInput.schema'
import { PostSumOrderByAggregateInputObjectSchema } from './PostSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    published: z.lazy(() => SortOrderSchema).optional(),
    firebaseId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    eventId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    styleId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    upvotes: z.lazy(() => SortOrderSchema).optional(),
    commentsCount: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => PostCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => PostAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => PostMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => PostMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => PostSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const PostOrderByWithAggregationInputObjectSchema = Schema
