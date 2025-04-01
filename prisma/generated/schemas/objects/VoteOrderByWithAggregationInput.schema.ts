import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { VoteCountOrderByAggregateInputObjectSchema } from './VoteCountOrderByAggregateInput.schema'
import { VoteMaxOrderByAggregateInputObjectSchema } from './VoteMaxOrderByAggregateInput.schema'
import { VoteMinOrderByAggregateInputObjectSchema } from './VoteMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    winnerId: z.lazy(() => SortOrderSchema).optional(),
    loserId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    createdById: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => VoteCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => VoteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => VoteMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const VoteOrderByWithAggregationInputObjectSchema = Schema
