import { z } from 'zod'
import { DanceStyleCreateWithoutVideosInputObjectSchema } from './DanceStyleCreateWithoutVideosInput.schema'
import { DanceStyleUncheckedCreateWithoutVideosInputObjectSchema } from './DanceStyleUncheckedCreateWithoutVideosInput.schema'
import { DanceStyleCreateOrConnectWithoutVideosInputObjectSchema } from './DanceStyleCreateOrConnectWithoutVideosInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateNestedOneWithoutVideosInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DanceStyleCreateWithoutVideosInputObjectSchema),
        z.lazy(() => DanceStyleUncheckedCreateWithoutVideosInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DanceStyleCreateOrConnectWithoutVideosInputObjectSchema)
      .optional(),
    connect: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const DanceStyleCreateNestedOneWithoutVideosInputObjectSchema = Schema
