import { z } from 'zod'
import { CityWhereInputObjectSchema } from './CityWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityListRelationFilter> = z
  .object({
    every: z.lazy(() => CityWhereInputObjectSchema).optional(),
    some: z.lazy(() => CityWhereInputObjectSchema).optional(),
    none: z.lazy(() => CityWhereInputObjectSchema).optional(),
  })
  .strict()

export const CityListRelationFilterObjectSchema = Schema
