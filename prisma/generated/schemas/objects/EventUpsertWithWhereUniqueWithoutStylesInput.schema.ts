import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutStylesInputObjectSchema } from './EventUpdateWithoutStylesInput.schema'
import { EventUncheckedUpdateWithoutStylesInputObjectSchema } from './EventUncheckedUpdateWithoutStylesInput.schema'
import { EventCreateWithoutStylesInputObjectSchema } from './EventCreateWithoutStylesInput.schema'
import { EventUncheckedCreateWithoutStylesInputObjectSchema } from './EventUncheckedCreateWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutStylesInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => EventUpdateWithoutStylesInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutStylesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EventCreateWithoutStylesInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutStylesInputObjectSchema),
    ]),
  })
  .strict()

export const EventUpsertWithWhereUniqueWithoutStylesInputObjectSchema = Schema
