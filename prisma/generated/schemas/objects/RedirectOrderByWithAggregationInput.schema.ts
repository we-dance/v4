import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { RedirectCountOrderByAggregateInputObjectSchema } from './RedirectCountOrderByAggregateInput.schema'
import { RedirectMaxOrderByAggregateInputObjectSchema } from './RedirectMaxOrderByAggregateInput.schema'
import { RedirectMinOrderByAggregateInputObjectSchema } from './RedirectMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.RedirectOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    from: z.lazy(() => SortOrderSchema).optional(),
    to: z.lazy(() => SortOrderSchema).optional(),
    note: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => RedirectCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => RedirectMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => RedirectMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const RedirectOrderByWithAggregationInputObjectSchema = Schema
