import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { CityListRelationFilterObjectSchema } from './CityListRelationFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CountryWhereInputObjectSchema),
        z.lazy(() => CountryWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CountryWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CountryWhereInputObjectSchema),
        z.lazy(() => CountryWhereInputObjectSchema).array(),
      ])
      .optional(),
    code: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    cities: z.lazy(() => CityListRelationFilterObjectSchema).optional(),
  })
  .strict()

export const CountryWhereInputObjectSchema = Schema
