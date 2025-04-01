import { z } from 'zod'
import { EventCreateWithoutGuestsInputObjectSchema } from './EventCreateWithoutGuestsInput.schema'
import { EventUncheckedCreateWithoutGuestsInputObjectSchema } from './EventUncheckedCreateWithoutGuestsInput.schema'
import { EventCreateOrConnectWithoutGuestsInputObjectSchema } from './EventCreateOrConnectWithoutGuestsInput.schema'
import { EventUpsertWithoutGuestsInputObjectSchema } from './EventUpsertWithoutGuestsInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutGuestsInputObjectSchema } from './EventUpdateWithoutGuestsInput.schema'
import { EventUncheckedUpdateWithoutGuestsInputObjectSchema } from './EventUncheckedUpdateWithoutGuestsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutGuestsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EventCreateWithoutGuestsInputObjectSchema),
          z.lazy(() => EventUncheckedCreateWithoutGuestsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => EventCreateOrConnectWithoutGuestsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => EventUpsertWithoutGuestsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => EventWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => EventUpdateWithoutGuestsInputObjectSchema),
          z.lazy(() => EventUncheckedUpdateWithoutGuestsInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const EventUpdateOneRequiredWithoutGuestsNestedInputObjectSchema = Schema
