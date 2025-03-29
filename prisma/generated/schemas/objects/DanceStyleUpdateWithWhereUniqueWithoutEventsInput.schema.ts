import { z } from 'zod'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleUpdateWithoutEventsInputObjectSchema } from './DanceStyleUpdateWithoutEventsInput.schema'
import { DanceStyleUncheckedUpdateWithoutEventsInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpdateWithWhereUniqueWithoutEventsInput> =
  z
    .object({
      where: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => DanceStyleUpdateWithoutEventsInputObjectSchema),
        z.lazy(() => DanceStyleUncheckedUpdateWithoutEventsInputObjectSchema),
      ]),
    })
    .strict()

export const DanceStyleUpdateWithWhereUniqueWithoutEventsInputObjectSchema =
  Schema
