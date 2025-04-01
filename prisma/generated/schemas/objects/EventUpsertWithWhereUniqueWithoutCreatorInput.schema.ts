import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutCreatorInputObjectSchema } from './EventUpdateWithoutCreatorInput.schema'
import { EventUncheckedUpdateWithoutCreatorInputObjectSchema } from './EventUncheckedUpdateWithoutCreatorInput.schema'
import { EventCreateWithoutCreatorInputObjectSchema } from './EventCreateWithoutCreatorInput.schema'
import { EventUncheckedCreateWithoutCreatorInputObjectSchema } from './EventUncheckedCreateWithoutCreatorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutCreatorInput> =
  z
    .object({
      where: z.lazy(() => EventWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => EventUpdateWithoutCreatorInputObjectSchema),
        z.lazy(() => EventUncheckedUpdateWithoutCreatorInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => EventCreateWithoutCreatorInputObjectSchema),
        z.lazy(() => EventUncheckedCreateWithoutCreatorInputObjectSchema),
      ]),
    })
    .strict()

export const EventUpsertWithWhereUniqueWithoutCreatorInputObjectSchema = Schema
