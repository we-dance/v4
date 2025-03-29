import { z } from 'zod'
import { CitySubscriberCreateWithoutProfileInputObjectSchema } from './CitySubscriberCreateWithoutProfileInput.schema'
import { CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutProfileInput.schema'
import { CitySubscriberCreateOrConnectWithoutProfileInputObjectSchema } from './CitySubscriberCreateOrConnectWithoutProfileInput.schema'
import { CitySubscriberCreateManyProfileInputEnvelopeObjectSchema } from './CitySubscriberCreateManyProfileInputEnvelope.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateNestedManyWithoutProfileInput> =
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
      createMany: z
        .lazy(() => CitySubscriberCreateManyProfileInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
          z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CitySubscriberCreateNestedManyWithoutProfileInputObjectSchema =
  Schema
