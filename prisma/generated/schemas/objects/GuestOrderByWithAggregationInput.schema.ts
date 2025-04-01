import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { GuestCountOrderByAggregateInputObjectSchema } from './GuestCountOrderByAggregateInput.schema'
import { GuestMaxOrderByAggregateInputObjectSchema } from './GuestMaxOrderByAggregateInput.schema'
import { GuestMinOrderByAggregateInputObjectSchema } from './GuestMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    eventId: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    invitedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    confirmedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    cancelledAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    registeredAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    waitlistedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => GuestCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => GuestMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => GuestMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const GuestOrderByWithAggregationInputObjectSchema = Schema
