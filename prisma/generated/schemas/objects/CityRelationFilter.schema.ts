import { z } from 'zod'
import { CityWhereInputObjectSchema } from './CityWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityRelationFilter> = z
  .object({
    is: z
      .lazy(() => CityWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => CityWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const CityRelationFilterObjectSchema = Schema
