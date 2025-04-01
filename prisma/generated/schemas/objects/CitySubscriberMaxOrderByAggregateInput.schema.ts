import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    cityId: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const CitySubscriberMaxOrderByAggregateInputObjectSchema = Schema
