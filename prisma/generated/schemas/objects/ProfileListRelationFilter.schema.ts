import { z } from 'zod'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileListRelationFilter> = z
  .object({
    every: z.lazy(() => ProfileWhereInputObjectSchema).optional(),
    some: z.lazy(() => ProfileWhereInputObjectSchema).optional(),
    none: z.lazy(() => ProfileWhereInputObjectSchema).optional(),
  })
  .strict()

export const ProfileListRelationFilterObjectSchema = Schema
