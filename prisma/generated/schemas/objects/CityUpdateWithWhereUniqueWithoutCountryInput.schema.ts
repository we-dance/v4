import { z } from 'zod'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityUpdateWithoutCountryInputObjectSchema } from './CityUpdateWithoutCountryInput.schema'
import { CityUncheckedUpdateWithoutCountryInputObjectSchema } from './CityUncheckedUpdateWithoutCountryInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpdateWithWhereUniqueWithoutCountryInput> = z
  .object({
    where: z.lazy(() => CityWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => CityUpdateWithoutCountryInputObjectSchema),
      z.lazy(() => CityUncheckedUpdateWithoutCountryInputObjectSchema),
    ]),
  })
  .strict()

export const CityUpdateWithWhereUniqueWithoutCountryInputObjectSchema = Schema
