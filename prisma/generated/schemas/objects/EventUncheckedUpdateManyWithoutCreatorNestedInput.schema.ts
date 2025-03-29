import { z } from 'zod'
import { EventCreateWithoutCreatorInputObjectSchema } from './EventCreateWithoutCreatorInput.schema'
import { EventUncheckedCreateWithoutCreatorInputObjectSchema } from './EventUncheckedCreateWithoutCreatorInput.schema'
import { EventCreateOrConnectWithoutCreatorInputObjectSchema } from './EventCreateOrConnectWithoutCreatorInput.schema'
import { EventUpsertWithWhereUniqueWithoutCreatorInputObjectSchema } from './EventUpsertWithWhereUniqueWithoutCreatorInput.schema'
import { EventCreateManyCreatorInputEnvelopeObjectSchema } from './EventCreateManyCreatorInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithWhereUniqueWithoutCreatorInputObjectSchema } from './EventUpdateWithWhereUniqueWithoutCreatorInput.schema'
import { EventUpdateManyWithWhereWithoutCreatorInputObjectSchema } from './EventUpdateManyWithWhereWithoutCreatorInput.schema'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutCreatorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EventCreateWithoutCreatorInputObjectSchema),
          z.lazy(() => EventCreateWithoutCreatorInputObjectSchema).array(),
          z.lazy(() => EventUncheckedCreateWithoutCreatorInputObjectSchema),
          z
            .lazy(() => EventUncheckedCreateWithoutCreatorInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => EventCreateOrConnectWithoutCreatorInputObjectSchema),
          z
            .lazy(() => EventCreateOrConnectWithoutCreatorInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => EventUpsertWithWhereUniqueWithoutCreatorInputObjectSchema
          ),
          z
            .lazy(
              () => EventUpsertWithWhereUniqueWithoutCreatorInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => EventCreateManyCreatorInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => EventWhereUniqueInputObjectSchema),
          z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => EventWhereUniqueInputObjectSchema),
          z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => EventWhereUniqueInputObjectSchema),
          z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => EventWhereUniqueInputObjectSchema),
          z.lazy(() => EventWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => EventUpdateWithWhereUniqueWithoutCreatorInputObjectSchema
          ),
          z
            .lazy(
              () => EventUpdateWithWhereUniqueWithoutCreatorInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => EventUpdateManyWithWhereWithoutCreatorInputObjectSchema),
          z
            .lazy(() => EventUpdateManyWithWhereWithoutCreatorInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => EventScalarWhereInputObjectSchema),
          z.lazy(() => EventScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const EventUncheckedUpdateManyWithoutCreatorNestedInputObjectSchema =
  Schema
