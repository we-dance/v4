import { z } from 'zod'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleUpdateWithoutEventsInputObjectSchema } from './DanceStyleUpdateWithoutEventsInput.schema'
import { DanceStyleUncheckedUpdateWithoutEventsInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutEventsInput.schema'
import { DanceStyleCreateWithoutEventsInputObjectSchema } from './DanceStyleCreateWithoutEventsInput.schema'
import { DanceStyleUncheckedCreateWithoutEventsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpsertWithWhereUniqueWithoutEventsInput> =
  z
    .object({
      where: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => DanceStyleUpdateWithoutEventsInputObjectSchema),
        z.lazy(() => DanceStyleUncheckedUpdateWithoutEventsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => DanceStyleCreateWithoutEventsInputObjectSchema),
        z.lazy(() => DanceStyleUncheckedCreateWithoutEventsInputObjectSchema),
      ]),
    })
    .strict()

export const DanceStyleUpsertWithWhereUniqueWithoutEventsInputObjectSchema =
  Schema
