import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { DanceStyleOrderByWithRelationInputObjectSchema } from './DanceStyleOrderByWithRelationInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    styleId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    createdById: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    style: z
      .lazy(() => DanceStyleOrderByWithRelationInputObjectSchema)
      .optional(),
    createdBy: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const VideoOrderByWithRelationInputObjectSchema = Schema
