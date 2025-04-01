import { z } from 'zod'
import { CityCreateNestedManyWithoutCountryInputObjectSchema } from './CityCreateNestedManyWithoutCountryInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryCreateInput> = z
  .object({
    code: z.string(),
    name: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    cities: z
      .lazy(() => CityCreateNestedManyWithoutCountryInputObjectSchema)
      .optional(),
  })
  .strict()

export const CountryCreateInputObjectSchema = Schema
