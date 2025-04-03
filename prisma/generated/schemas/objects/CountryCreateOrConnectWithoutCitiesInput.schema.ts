import { z } from 'zod'
import { CountryWhereUniqueInputObjectSchema } from './CountryWhereUniqueInput.schema'
import { CountryCreateWithoutCitiesInputObjectSchema } from './CountryCreateWithoutCitiesInput.schema'
import { CountryUncheckedCreateWithoutCitiesInputObjectSchema } from './CountryUncheckedCreateWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CountryCreateOrConnectWithoutCitiesInput> = z
  .object({
    where: z.lazy(() => CountryWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CountryCreateWithoutCitiesInputObjectSchema),
      z.lazy(() => CountryUncheckedCreateWithoutCitiesInputObjectSchema),
    ]),
  })
  .strict()

export const CountryCreateOrConnectWithoutCitiesInputObjectSchema = Schema
