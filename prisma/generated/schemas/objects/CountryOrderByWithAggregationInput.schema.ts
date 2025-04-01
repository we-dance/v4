import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CountryCountOrderByAggregateInputObjectSchema } from './CountryCountOrderByAggregateInput.schema'
import { CountryMaxOrderByAggregateInputObjectSchema } from './CountryMaxOrderByAggregateInput.schema'
import { CountryMinOrderByAggregateInputObjectSchema } from './CountryMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryOrderByWithAggregationInput> = z
  .object({
    code: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => CountryCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => CountryMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => CountryMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const CountryOrderByWithAggregationInputObjectSchema = Schema
