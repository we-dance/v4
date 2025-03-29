import { z } from 'zod'
import { CitySubscriberCreateWithoutProfileInputObjectSchema } from './CitySubscriberCreateWithoutProfileInput.schema'
import { CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutProfileInput.schema'
import { CitySubscriberCreateOrConnectWithoutProfileInputObjectSchema } from './CitySubscriberCreateOrConnectWithoutProfileInput.schema'
import { CitySubscriberUpsertWithWhereUniqueWithoutProfileInputObjectSchema } from './CitySubscriberUpsertWithWhereUniqueWithoutProfileInput.schema'
import { CitySubscriberCreateManyProfileInputEnvelopeObjectSchema } from './CitySubscriberCreateManyProfileInputEnvelope.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberUpdateWithWhereUniqueWithoutProfileInputObjectSchema } from './CitySubscriberUpdateWithWhereUniqueWithoutProfileInput.schema'
import { CitySubscriberUpdateManyWithWhereWithoutProfileInputObjectSchema } from './CitySubscriberUpdateManyWithWhereWithoutProfileInput.schema'
import { CitySubscriberScalarWhereInputObjectSchema } from './CitySubscriberScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUncheckedUpdateManyWithoutProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CitySubscriberCreateWithoutProfileInputObjectSchema),
          z
            .lazy(() => CitySubscriberCreateWithoutProfileInputObjectSchema)
            .array(),
          z.lazy(
            () => CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () => CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CitySubscriberCreateOrConnectWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () => CitySubscriberCreateOrConnectWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              CitySubscriberUpsertWithWhereUniqueWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CitySubscriberUpsertWithWhereUniqueWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CitySubscriberCreateManyProfileInputEnvelopeObjectSchema)
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
              CitySubscriberUpdateWithWhereUniqueWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CitySubscriberUpdateWithWhereUniqueWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              CitySubscriberUpdateManyWithWhereWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                CitySubscriberUpdateManyWithWhereWithoutProfileInputObjectSchema
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

export const CitySubscriberUncheckedUpdateManyWithoutProfileNestedInputObjectSchema =
  Schema
