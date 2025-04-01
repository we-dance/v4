import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    winnerId: z.lazy(() => SortOrderSchema).optional(),
    loserId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    createdById: z.lazy(() => SortOrderSchema).optional(),
    createdBy: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const VoteOrderByWithRelationInputObjectSchema = Schema
