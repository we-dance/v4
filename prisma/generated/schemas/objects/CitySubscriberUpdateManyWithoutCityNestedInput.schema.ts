import { z } from 'zod'
import { CitySubscriberCreateWithoutCityInputObjectSchema } from './CitySubscriberCreateWithoutCityInput.schema'
import { CitySubscriberUncheckedCreateWithoutCityInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutCityInput.schema'
import { CitySubscriberCreateOrConnectWithoutCityInputObjectSchema } from './CitySubscriberCreateOrConnectWithoutCityInput.schema'
import { CitySubscriberUpsertWithWhereUniqueWithoutCityInputObjectSchema } from './CitySubscriberUpsertWithWhereUniqueWithoutCityInput.schema'
import { CitySubscriberCreateManyCityInputEnvelopeObjectSchema } from './CitySubscriberCreateManyCityInputEnvelope.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberUpdateWithWhereUniqueWithoutCityInputObjectSchema } from './CitySubscriberUpdateWithWhereUniqueWithoutCityInput.schema'
import { CitySubscriberUpdateManyWithWhereWithoutCityInputObjectSchema } from './CitySubscriberUpdateManyWithWhereWithoutCityInput.schema'
import { CitySubscriberScalarWhereInputObjectSchema } from './CitySubscriberScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateManyWithoutCityNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              CitySubscriberUpsertWithWhereUniqueWithoutCityInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CitySubscriberUpsertWithWhereUniqueWithoutCityInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CitySubscriberCreateManyCityInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CitySubscriberUpdateWithWhereUniqueWithoutCityInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CitySubscriberUpdateWithWhereUniqueWithoutCityInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CitySubscriberUpdateManyWithWhereWithoutCityInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CitySubscriberUpdateManyWithWhereWithoutCityInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CitySubscriberScalarWhereInputObjectSchema),
          z.lazy(() => CitySubscriberScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CitySubscriberUpdateManyWithoutCityNestedInputObjectSchema = Schema
