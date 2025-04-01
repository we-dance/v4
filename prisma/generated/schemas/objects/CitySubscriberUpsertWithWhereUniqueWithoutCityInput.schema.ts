import { z } from 'zod'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberUpdateWithoutCityInputObjectSchema } from './CitySubscriberUpdateWithoutCityInput.schema'
import { CitySubscriberUncheckedUpdateWithoutCityInputObjectSchema } from './CitySubscriberUncheckedUpdateWithoutCityInput.schema'
import { CitySubscriberCreateWithoutCityInputObjectSchema } from './CitySubscriberCreateWithoutCityInput.schema'
import { CitySubscriberUncheckedCreateWithoutCityInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpsertWithWhereUniqueWithoutCityInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CitySubscriberUpdateWithoutCityInputObjectSchema),
        z.lazy(() => CitySubscriberUncheckedUpdateWithoutCityInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CitySubscriberCreateWithoutCityInputObjectSchema),
        z.lazy(() => CitySubscriberUncheckedCreateWithoutCityInputObjectSchema),
      ]),
    })
    .strict()

export const CitySubscriberUpsertWithWhereUniqueWithoutCityInputObjectSchema =
  Schema
