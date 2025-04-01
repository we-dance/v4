import { z } from 'zod'
import { CityFindManySchema } from '../findManyCity.schema'
import { CountryCountOutputTypeArgsObjectSchema } from './CountryCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountrySelect> = z
  .object({
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    cities: z.union([z.boolean(), z.lazy(() => CityFindManySchema)]).optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => CountryCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const CountrySelectObjectSchema = Schema
