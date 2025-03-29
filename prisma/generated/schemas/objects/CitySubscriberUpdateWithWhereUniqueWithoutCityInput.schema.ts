import { z } from 'zod'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberUpdateWithoutCityInputObjectSchema } from './CitySubscriberUpdateWithoutCityInput.schema'
import { CitySubscriberUncheckedUpdateWithoutCityInputObjectSchema } from './CitySubscriberUncheckedUpdateWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateWithWhereUniqueWithoutCityInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CitySubscriberUpdateWithoutCityInputObjectSchema),
        z.lazy(() => CitySubscriberUncheckedUpdateWithoutCityInputObjectSchema),
      ]),
    })
    .strict()

export const CitySubscriberUpdateWithWhereUniqueWithoutCityInputObjectSchema =
  Schema
