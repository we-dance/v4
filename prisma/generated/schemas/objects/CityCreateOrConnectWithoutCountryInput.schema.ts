import { z } from 'zod'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityCreateWithoutCountryInputObjectSchema } from './CityCreateWithoutCountryInput.schema'
import { CityUncheckedCreateWithoutCountryInputObjectSchema } from './CityUncheckedCreateWithoutCountryInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateOrConnectWithoutCountryInput> = z
  .object({
    where: z.lazy(() => CityWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CityCreateWithoutCountryInputObjectSchema),
      z.lazy(() => CityUncheckedCreateWithoutCountryInputObjectSchema),
    ]),
  })
  .strict()

export const CityCreateOrConnectWithoutCountryInputObjectSchema = Schema
