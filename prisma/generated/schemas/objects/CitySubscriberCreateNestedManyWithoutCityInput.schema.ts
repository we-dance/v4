import { z } from 'zod'
import { CitySubscriberCreateWithoutCityInputObjectSchema } from './CitySubscriberCreateWithoutCityInput.schema'
import { CitySubscriberUncheckedCreateWithoutCityInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutCityInput.schema'
import { CitySubscriberCreateOrConnectWithoutCityInputObjectSchema } from './CitySubscriberCreateOrConnectWithoutCityInput.schema'
import { CitySubscriberCreateManyCityInputEnvelopeObjectSchema } from './CitySubscriberCreateManyCityInputEnvelope.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateNestedManyWithoutCityInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CitySubscriberCreateWithoutCityInputObjectSchema),
          z
            .lazy(() => CitySubscriberCreateWithoutCityInputObjectSchema)
            .array(),
          z.lazy(
            () => CitySubscriberUncheckedCreateWithoutCityInputObjectSchema
          ),
          z
            .lazy(
              () => CitySubscriberUncheckedCreateWithoutCityInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CitySubscriberCreateOrConnectWithoutCityInputObjectSchema
          ),
          z
            .lazy(
              () => CitySubscriberCreateOrConnectWithoutCityInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CitySubscriberCreateManyCityInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CitySubscriberCreateNestedManyWithoutCityInputObjectSchema = Schema
