import { z } from 'zod'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleCreateWithoutEventsInputObjectSchema } from './DanceStyleCreateWithoutEventsInput.schema'
import { DanceStyleUncheckedCreateWithoutEventsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateOrConnectWithoutEventsInput> = z
  .object({
    where: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DanceStyleCreateWithoutEventsInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedCreateWithoutEventsInputObjectSchema),
    ]),
  })
  .strict()

export const DanceStyleCreateOrConnectWithoutEventsInputObjectSchema = Schema
