import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { VideoCountOrderByAggregateInputObjectSchema } from './VideoCountOrderByAggregateInput.schema'
import { VideoAvgOrderByAggregateInputObjectSchema } from './VideoAvgOrderByAggregateInput.schema'
import { VideoMaxOrderByAggregateInputObjectSchema } from './VideoMaxOrderByAggregateInput.schema'
import { VideoMinOrderByAggregateInputObjectSchema } from './VideoMinOrderByAggregateInput.schema'
import { VideoSumOrderByAggregateInputObjectSchema } from './VideoSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    styleId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    createdById: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    _count: z
      .lazy(() => VideoCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => VideoAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => VideoMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => VideoMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => VideoSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const VideoOrderByWithAggregationInputObjectSchema = Schema
