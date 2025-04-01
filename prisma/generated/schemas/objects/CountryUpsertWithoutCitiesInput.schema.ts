import { z } from 'zod'
import { CountryUpdateWithoutCitiesInputObjectSchema } from './CountryUpdateWithoutCitiesInput.schema'
import { CountryUncheckedUpdateWithoutCitiesInputObjectSchema } from './CountryUncheckedUpdateWithoutCitiesInput.schema'
import { CountryCreateWithoutCitiesInputObjectSchema } from './CountryCreateWithoutCitiesInput.schema'
import { CountryUncheckedCreateWithoutCitiesInputObjectSchema } from './CountryUncheckedCreateWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryUpsertWithoutCitiesInput> = z
  .object({
    update: z.union([
      z.lazy(() => CountryUpdateWithoutCitiesInputObjectSchema),
      z.lazy(() => CountryUncheckedUpdateWithoutCitiesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CountryCreateWithoutCitiesInputObjectSchema),
      z.lazy(() => CountryUncheckedCreateWithoutCitiesInputObjectSchema),
    ]),
  })
  .strict()

export const CountryUpsertWithoutCitiesInputObjectSchema = Schema
