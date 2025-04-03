import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySumOrderByAggregateInput> = z
  .object({
    lat: z.lazy(() => SortOrderSchema).optional(),
    lng: z.lazy(() => SortOrderSchema).optional(),
    membersCount: z.lazy(() => SortOrderSchema).optional(),
    subscribersCount: z.lazy(() => SortOrderSchema).optional(),
    viewsCount: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const CitySumOrderByAggregateInputObjectSchema = Schema
