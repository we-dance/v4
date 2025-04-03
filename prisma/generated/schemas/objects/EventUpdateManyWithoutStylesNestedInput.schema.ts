import { z } from 'zod'
import { EventCreateWithoutStylesInputObjectSchema } from './EventCreateWithoutStylesInput.schema'
import { EventUncheckedCreateWithoutStylesInputObjectSchema } from './EventUncheckedCreateWithoutStylesInput.schema'
import { EventCreateOrConnectWithoutStylesInputObjectSchema } from './EventCreateOrConnectWithoutStylesInput.schema'
import { EventUpsertWithWhereUniqueWithoutStylesInputObjectSchema } from './EventUpsertWithWhereUniqueWithoutStylesInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithWhereUniqueWithoutStylesInputObjectSchema } from './EventUpdateWithWhereUniqueWithoutStylesInput.schema'
import { EventUpdateManyWithWhereWithoutStylesInputObjectSchema } from './EventUpdateManyWithWhereWithoutStylesInput.schema'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateManyWithoutStylesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutStylesInputObjectSchema),
        z.lazy(() => EventCreateWithoutStylesInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventUncheckedCreateWithoutStylesInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventCreateOrConnectWithoutStylesInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => EventUpsertWithWhereUniqueWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventUpsertWithWhereUniqueWithoutStylesInputObjectSchema)
          .array(),
      ])
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
        z.lazy(() => EventUpdateWithWhereUniqueWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventUpdateWithWhereUniqueWithoutStylesInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => EventUpdateManyWithWhereWithoutStylesInputObjectSchema),
        z
          .lazy(() => EventUpdateManyWithWhereWithoutStylesInputObjectSchema)
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

export const EventUpdateManyWithoutStylesNestedInputObjectSchema = Schema
