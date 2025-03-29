import { z } from 'zod'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityUpdateWithoutCountryInputObjectSchema } from './CityUpdateWithoutCountryInput.schema'
import { CityUncheckedUpdateWithoutCountryInputObjectSchema } from './CityUncheckedUpdateWithoutCountryInput.schema'
import { CityCreateWithoutCountryInputObjectSchema } from './CityCreateWithoutCountryInput.schema'
import { CityUncheckedCreateWithoutCountryInputObjectSchema } from './CityUncheckedCreateWithoutCountryInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpsertWithWhereUniqueWithoutCountryInput> = z
  .object({
    where: z.lazy(() => CityWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => CityUpdateWithoutCountryInputObjectSchema),
      z.lazy(() => CityUncheckedUpdateWithoutCountryInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CityCreateWithoutCountryInputObjectSchema),
      z.lazy(() => CityUncheckedCreateWithoutCountryInputObjectSchema),
    ]),
  })
  .strict()

export const CityUpsertWithWhereUniqueWithoutCountryInputObjectSchema = Schema
