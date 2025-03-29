import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutGuestsInputObjectSchema } from './EventCreateWithoutGuestsInput.schema'
import { EventUncheckedCreateWithoutGuestsInputObjectSchema } from './EventUncheckedCreateWithoutGuestsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutGuestsInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutGuestsInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutGuestsInputObjectSchema),
    ]),
  })
  .strict()

export const EventCreateOrConnectWithoutGuestsInputObjectSchema = Schema
