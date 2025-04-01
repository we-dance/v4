import { z } from 'zod'
import { ProfileFollowerWhereInputObjectSchema } from './ProfileFollowerWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerListRelationFilter> = z
  .object({
    every: z.lazy(() => ProfileFollowerWhereInputObjectSchema).optional(),
    some: z.lazy(() => ProfileFollowerWhereInputObjectSchema).optional(),
    none: z.lazy(() => ProfileFollowerWhereInputObjectSchema).optional(),
  })
  .strict()

export const ProfileFollowerListRelationFilterObjectSchema = Schema
