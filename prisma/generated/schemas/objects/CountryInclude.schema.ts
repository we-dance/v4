import { z } from 'zod'
import { CityFindManySchema } from '../findManyCity.schema'
import { CountryCountOutputTypeArgsObjectSchema } from './CountryCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryInclude> = z
  .object({
    cities: z.union([z.boolean(), z.lazy(() => CityFindManySchema)]).optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => CountryCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const CountryIncludeObjectSchema = Schema
