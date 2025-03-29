import { z } from 'zod'
import { CountryCreateWithoutCitiesInputObjectSchema } from './CountryCreateWithoutCitiesInput.schema'
import { CountryUncheckedCreateWithoutCitiesInputObjectSchema } from './CountryUncheckedCreateWithoutCitiesInput.schema'
import { CountryCreateOrConnectWithoutCitiesInputObjectSchema } from './CountryCreateOrConnectWithoutCitiesInput.schema'
import { CountryWhereUniqueInputObjectSchema } from './CountryWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryCreateNestedOneWithoutCitiesInput> = z
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
    connect: z.lazy(() => CountryWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const CountryCreateNestedOneWithoutCitiesInputObjectSchema = Schema
