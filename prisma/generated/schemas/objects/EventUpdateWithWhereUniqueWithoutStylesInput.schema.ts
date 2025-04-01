import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutStylesInputObjectSchema } from './EventUpdateWithoutStylesInput.schema'
import { EventUncheckedUpdateWithoutStylesInputObjectSchema } from './EventUncheckedUpdateWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutStylesInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateWithoutStylesInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutStylesInputObjectSchema),
    ]),
  })
  .strict()

export const EventUpdateWithWhereUniqueWithoutStylesInputObjectSchema = Schema
