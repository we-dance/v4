import { z } from 'zod'
import { CountryCreateWithoutCitiesInputObjectSchema } from './CountryCreateWithoutCitiesInput.schema'
import { CountryUncheckedCreateWithoutCitiesInputObjectSchema } from './CountryUncheckedCreateWithoutCitiesInput.schema'
import { CountryCreateOrConnectWithoutCitiesInputObjectSchema } from './CountryCreateOrConnectWithoutCitiesInput.schema'
import { CountryUpsertWithoutCitiesInputObjectSchema } from './CountryUpsertWithoutCitiesInput.schema'
import { CountryWhereUniqueInputObjectSchema } from './CountryWhereUniqueInput.schema'
import { CountryUpdateWithoutCitiesInputObjectSchema } from './CountryUpdateWithoutCitiesInput.schema'
import { CountryUncheckedUpdateWithoutCitiesInputObjectSchema } from './CountryUncheckedUpdateWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutCitiesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CountryCreateWithoutCitiesInputObjectSchema),
          z.lazy(() => CountryUncheckedCreateWithoutCitiesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CountryCreateOrConnectWithoutCitiesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CountryUpsertWithoutCitiesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CountryWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CountryUpdateWithoutCitiesInputObjectSchema),
          z.lazy(() => CountryUncheckedUpdateWithoutCitiesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const CountryUpdateOneRequiredWithoutCitiesNestedInputObjectSchema =
  Schema
