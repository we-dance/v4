import { z } from 'zod'
import { CityUncheckedCreateNestedManyWithoutCountryInputObjectSchema } from './CityUncheckedCreateNestedManyWithoutCountryInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z
  .object({
    code: z.string(),
    name: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    cities: z
      .lazy(() => CityUncheckedCreateNestedManyWithoutCountryInputObjectSchema)
      .optional(),
  })
  .strict()

export const CountryUncheckedCreateInputObjectSchema = Schema
