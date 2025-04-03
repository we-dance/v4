import { z } from 'zod'
import { CountryWhereInputObjectSchema } from './CountryWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryRelationFilter> = z
  .object({
    is: z
      .lazy(() => CountryWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => CountryWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict()

export const CountryRelationFilterObjectSchema = Schema
