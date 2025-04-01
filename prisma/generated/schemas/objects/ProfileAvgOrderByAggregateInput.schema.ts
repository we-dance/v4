import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileAvgOrderByAggregateInput> = z
  .object({
    lng: z.lazy(() => SortOrderSchema).optional(),
    lat: z.lazy(() => SortOrderSchema).optional(),
    followersCount: z.lazy(() => SortOrderSchema).optional(),
    followingCount: z.lazy(() => SortOrderSchema).optional(),
    viewsCount: z.lazy(() => SortOrderSchema).optional(),
    daysUsed: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const ProfileAvgOrderByAggregateInputObjectSchema = Schema
