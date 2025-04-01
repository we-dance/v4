import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    followerId: z.lazy(() => SortOrderSchema).optional(),
    profileId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    follower: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
    profile: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const ProfileFollowerOrderByWithRelationInputObjectSchema = Schema
