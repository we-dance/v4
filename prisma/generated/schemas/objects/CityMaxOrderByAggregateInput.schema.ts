import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityMaxOrderByAggregateInput> = z
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
  })
  .strict()

export const CityMaxOrderByAggregateInputObjectSchema = Schema
