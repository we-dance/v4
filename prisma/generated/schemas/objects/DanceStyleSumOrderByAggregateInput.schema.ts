import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleSumOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    popularity: z.lazy(() => SortOrderSchema).optional(),
    membersCount: z.lazy(() => SortOrderSchema).optional(),
    eventsCount: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const DanceStyleSumOrderByAggregateInputObjectSchema = Schema
