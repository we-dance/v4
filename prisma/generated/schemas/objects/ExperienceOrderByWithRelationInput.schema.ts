import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'
import { DanceStyleOrderByWithRelationInputObjectSchema } from './DanceStyleOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceOrderByWithRelationInput> = z
  .object({
    level: z.lazy(() => SortOrderSchema).optional(),
    highlighted: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    styleId: z.lazy(() => SortOrderSchema).optional(),
    profile: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
    style: z
      .lazy(() => DanceStyleOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const ExperienceOrderByWithRelationInputObjectSchema = Schema
