import { z } from 'zod'
import { EventCreateWithoutOrganizerInputObjectSchema } from './EventCreateWithoutOrganizerInput.schema'
import { EventUncheckedCreateWithoutOrganizerInputObjectSchema } from './EventUncheckedCreateWithoutOrganizerInput.schema'
import { EventCreateOrConnectWithoutOrganizerInputObjectSchema } from './EventCreateOrConnectWithoutOrganizerInput.schema'
import { EventUpsertWithWhereUniqueWithoutOrganizerInputObjectSchema } from './EventUpsertWithWhereUniqueWithoutOrganizerInput.schema'
import { EventCreateManyOrganizerInputEnvelopeObjectSchema } from './EventCreateManyOrganizerInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithWhereUniqueWithoutOrganizerInputObjectSchema } from './EventUpdateWithWhereUniqueWithoutOrganizerInput.schema'
import { EventUpdateManyWithWhereWithoutOrganizerInputObjectSchema } from './EventUpdateManyWithWhereWithoutOrganizerInput.schema'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutOrganizerNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EventCreateWithoutOrganizerInputObjectSchema),
          z.lazy(() => EventCreateWithoutOrganizerInputObjectSchema).array(),
          z.lazy(() => EventUncheckedCreateWithoutOrganizerInputObjectSchema),
          z
            .lazy(() => EventUncheckedCreateWithoutOrganizerInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => EventCreateOrConnectWithoutOrganizerInputObjectSchema),
          z
            .lazy(() => EventCreateOrConnectWithoutOrganizerInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => EventUpsertWithWhereUniqueWithoutOrganizerInputObjectSchema
          ),
          z
            .lazy(
              () => EventUpsertWithWhereUniqueWithoutOrganizerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => EventCreateManyOrganizerInputEnvelopeObjectSchema)
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
            () => EventUpdateWithWhereUniqueWithoutOrganizerInputObjectSchema
          ),
          z
            .lazy(
              () => EventUpdateWithWhereUniqueWithoutOrganizerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => EventUpdateManyWithWhereWithoutOrganizerInputObjectSchema
          ),
          z
            .lazy(
              () => EventUpdateManyWithWhereWithoutOrganizerInputObjectSchema
            )
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

export const EventUncheckedUpdateManyWithoutOrganizerNestedInputObjectSchema =
  Schema
