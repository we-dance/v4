import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { OfferCountOrderByAggregateInputObjectSchema } from './OfferCountOrderByAggregateInput.schema'
import { OfferAvgOrderByAggregateInputObjectSchema } from './OfferAvgOrderByAggregateInput.schema'
import { OfferMaxOrderByAggregateInputObjectSchema } from './OfferMaxOrderByAggregateInput.schema'
import { OfferMinOrderByAggregateInputObjectSchema } from './OfferMinOrderByAggregateInput.schema'
import { OfferSumOrderByAggregateInputObjectSchema } from './OfferSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    currency: z.lazy(() => SortOrderSchema).optional(),
    duration: z.lazy(() => SortOrderSchema).optional(),
    validFrom: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    validThrough: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    courseId: z.lazy(() => SortOrderSchema).optional(),
    items: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => OfferCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => OfferAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => OfferMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => OfferMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => OfferSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const OfferOrderByWithAggregationInputObjectSchema = Schema
