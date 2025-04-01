import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { ProfileFollowerCountOrderByAggregateInputObjectSchema } from './ProfileFollowerCountOrderByAggregateInput.schema'
import { ProfileFollowerAvgOrderByAggregateInputObjectSchema } from './ProfileFollowerAvgOrderByAggregateInput.schema'
import { ProfileFollowerMaxOrderByAggregateInputObjectSchema } from './ProfileFollowerMaxOrderByAggregateInput.schema'
import { ProfileFollowerMinOrderByAggregateInputObjectSchema } from './ProfileFollowerMinOrderByAggregateInput.schema'
import { ProfileFollowerSumOrderByAggregateInputObjectSchema } from './ProfileFollowerSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    followerId: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ProfileFollowerCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => ProfileFollowerAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => ProfileFollowerMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => ProfileFollowerMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => ProfileFollowerSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const ProfileFollowerOrderByWithAggregationInputObjectSchema = Schema
