import { z } from 'zod'
import { EventUpdateWithoutGuestsInputObjectSchema } from './EventUpdateWithoutGuestsInput.schema'
import { EventUncheckedUpdateWithoutGuestsInputObjectSchema } from './EventUncheckedUpdateWithoutGuestsInput.schema'
import { EventCreateWithoutGuestsInputObjectSchema } from './EventCreateWithoutGuestsInput.schema'
import { EventUncheckedCreateWithoutGuestsInputObjectSchema } from './EventUncheckedCreateWithoutGuestsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithoutGuestsInput> = z
  .object({
    update: z.union([
      z.lazy(() => EventUpdateWithoutGuestsInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutGuestsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EventCreateWithoutGuestsInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutGuestsInputObjectSchema),
    ]),
  })
  .strict()

export const EventUpsertWithoutGuestsInputObjectSchema = Schema
