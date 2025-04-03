import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CitySubscriberCountOrderByAggregateInputObjectSchema } from './CitySubscriberCountOrderByAggregateInput.schema'
import { CitySubscriberAvgOrderByAggregateInputObjectSchema } from './CitySubscriberAvgOrderByAggregateInput.schema'
import { CitySubscriberMaxOrderByAggregateInputObjectSchema } from './CitySubscriberMaxOrderByAggregateInput.schema'
import { CitySubscriberMinOrderByAggregateInputObjectSchema } from './CitySubscriberMinOrderByAggregateInput.schema'
import { CitySubscriberSumOrderByAggregateInputObjectSchema } from './CitySubscriberSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    cityId: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CitySubscriberCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z
      .lazy(() => CitySubscriberAvgOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z
      .lazy(() => CitySubscriberMaxOrderByAggregateInputObjectSchema)
      .optional(),
    _min: z
      .lazy(() => CitySubscriberMinOrderByAggregateInputObjectSchema)
      .optional(),
    _sum: z
      .lazy(() => CitySubscriberSumOrderByAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const CitySubscriberOrderByWithAggregationInputObjectSchema = Schema
