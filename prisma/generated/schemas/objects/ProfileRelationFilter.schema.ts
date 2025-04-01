import { z } from 'zod'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileRelationFilter> = z
  .object({
    is: z
      .lazy(() => ProfileWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ProfileWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const ProfileRelationFilterObjectSchema = Schema
