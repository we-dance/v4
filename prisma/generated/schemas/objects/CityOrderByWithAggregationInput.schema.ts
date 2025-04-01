import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CityCountOrderByAggregateInputObjectSchema } from './CityCountOrderByAggregateInput.schema'
import { CityAvgOrderByAggregateInputObjectSchema } from './CityAvgOrderByAggregateInput.schema'
import { CityMaxOrderByAggregateInputObjectSchema } from './CityMaxOrderByAggregateInput.schema'
import { CityMinOrderByAggregateInputObjectSchema } from './CityMinOrderByAggregateInput.schema'
import { CitySumOrderByAggregateInputObjectSchema } from './CitySumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    region: z.lazy(() => SortOrderSchema).optional(),
    countryCode: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    slug: z.lazy(() => SortOrderSchema).optional(),
    lat: z.lazy(() => SortOrderSchema).optional(),
    lng: z.lazy(() => SortOrderSchema).optional(),
    membersCount: z.lazy(() => SortOrderSchema).optional(),
    subscribersCount: z.lazy(() => SortOrderSchema).optional(),
    viewsCount: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => CityCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => CityAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => CityMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => CityMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => CitySumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const CityOrderByWithAggregationInputObjectSchema = Schema
