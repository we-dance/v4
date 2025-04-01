import { z } from 'zod'
import { DanceStyleCreateWithoutEventsInputObjectSchema } from './DanceStyleCreateWithoutEventsInput.schema'
import { DanceStyleUncheckedCreateWithoutEventsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutEventsInput.schema'
import { DanceStyleCreateOrConnectWithoutEventsInputObjectSchema } from './DanceStyleCreateOrConnectWithoutEventsInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateNestedManyWithoutEventsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DanceStyleCreateWithoutEventsInputObjectSchema),
        z.lazy(() => DanceStyleCreateWithoutEventsInputObjectSchema).array(),
        z.lazy(() => DanceStyleUncheckedCreateWithoutEventsInputObjectSchema),
        z
          .lazy(() => DanceStyleUncheckedCreateWithoutEventsInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DanceStyleCreateOrConnectWithoutEventsInputObjectSchema),
        z
          .lazy(() => DanceStyleCreateOrConnectWithoutEventsInputObjectSchema)
          .array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
        z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const DanceStyleCreateNestedManyWithoutEventsInputObjectSchema = Schema
