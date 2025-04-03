import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutCreatorInputObjectSchema } from './EventUpdateWithoutCreatorInput.schema'
import { EventUncheckedUpdateWithoutCreatorInputObjectSchema } from './EventUncheckedUpdateWithoutCreatorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutCreatorInput> =
  z
    .object({
      where: z.lazy(() => EventWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => EventUpdateWithoutCreatorInputObjectSchema),
        z.lazy(() => EventUncheckedUpdateWithoutCreatorInputObjectSchema),
      ]),
    })
    .strict()

export const EventUpdateWithWhereUniqueWithoutCreatorInputObjectSchema = Schema
