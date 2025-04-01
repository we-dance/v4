import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    eventId: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    invitedAt: z.lazy(() => SortOrderSchema).optional(),
    confirmedAt: z.lazy(() => SortOrderSchema).optional(),
    cancelledAt: z.lazy(() => SortOrderSchema).optional(),
    registeredAt: z.lazy(() => SortOrderSchema).optional(),
    waitlistedAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const GuestMinOrderByAggregateInputObjectSchema = Schema
