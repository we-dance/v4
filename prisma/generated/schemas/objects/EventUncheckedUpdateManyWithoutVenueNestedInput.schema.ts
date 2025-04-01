import { z } from 'zod'
import { EventCreateWithoutVenueInputObjectSchema } from './EventCreateWithoutVenueInput.schema'
import { EventUncheckedCreateWithoutVenueInputObjectSchema } from './EventUncheckedCreateWithoutVenueInput.schema'
import { EventCreateOrConnectWithoutVenueInputObjectSchema } from './EventCreateOrConnectWithoutVenueInput.schema'
import { EventUpsertWithWhereUniqueWithoutVenueInputObjectSchema } from './EventUpsertWithWhereUniqueWithoutVenueInput.schema'
import { EventCreateManyVenueInputEnvelopeObjectSchema } from './EventCreateManyVenueInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithWhereUniqueWithoutVenueInputObjectSchema } from './EventUpdateWithWhereUniqueWithoutVenueInput.schema'
import { EventUpdateManyWithWhereWithoutVenueInputObjectSchema } from './EventUpdateManyWithWhereWithoutVenueInput.schema'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutVenueNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EventCreateWithoutVenueInputObjectSchema),
          z.lazy(() => EventCreateWithoutVenueInputObjectSchema).array(),
          z.lazy(() => EventUncheckedCreateWithoutVenueInputObjectSchema),
          z
            .lazy(() => EventUncheckedCreateWithoutVenueInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => EventCreateOrConnectWithoutVenueInputObjectSchema),
          z
            .lazy(() => EventCreateOrConnectWithoutVenueInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => EventUpsertWithWhereUniqueWithoutVenueInputObjectSchema),
          z
            .lazy(() => EventUpsertWithWhereUniqueWithoutVenueInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => EventCreateManyVenueInputEnvelopeObjectSchema)
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
          z.lazy(() => EventUpdateWithWhereUniqueWithoutVenueInputObjectSchema),
          z
            .lazy(() => EventUpdateWithWhereUniqueWithoutVenueInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => EventUpdateManyWithWhereWithoutVenueInputObjectSchema),
          z
            .lazy(() => EventUpdateManyWithWhereWithoutVenueInputObjectSchema)
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

export const EventUncheckedUpdateManyWithoutVenueNestedInputObjectSchema =
  Schema
