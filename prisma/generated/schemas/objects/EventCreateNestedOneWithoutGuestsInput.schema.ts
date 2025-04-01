import { z } from 'zod'
import { EventCreateWithoutGuestsInputObjectSchema } from './EventCreateWithoutGuestsInput.schema'
import { EventUncheckedCreateWithoutGuestsInputObjectSchema } from './EventUncheckedCreateWithoutGuestsInput.schema'
import { EventCreateOrConnectWithoutGuestsInputObjectSchema } from './EventCreateOrConnectWithoutGuestsInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedOneWithoutGuestsInput> = z
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
    connect: z.lazy(() => EventWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const EventCreateNestedOneWithoutGuestsInputObjectSchema = Schema
