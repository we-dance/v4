import { z } from 'zod'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberCreateWithoutCityInputObjectSchema } from './CitySubscriberCreateWithoutCityInput.schema'
import { CitySubscriberUncheckedCreateWithoutCityInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateOrConnectWithoutCityInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CitySubscriberCreateWithoutCityInputObjectSchema),
        z.lazy(() => CitySubscriberUncheckedCreateWithoutCityInputObjectSchema),
      ]),
    })
    .strict()

export const CitySubscriberCreateOrConnectWithoutCityInputObjectSchema = Schema
