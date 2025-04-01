import { z } from 'zod'
import { DanceStyleCreateWithoutVideosInputObjectSchema } from './DanceStyleCreateWithoutVideosInput.schema'
import { DanceStyleUncheckedCreateWithoutVideosInputObjectSchema } from './DanceStyleUncheckedCreateWithoutVideosInput.schema'
import { DanceStyleCreateOrConnectWithoutVideosInputObjectSchema } from './DanceStyleCreateOrConnectWithoutVideosInput.schema'
import { DanceStyleUpsertWithoutVideosInputObjectSchema } from './DanceStyleUpsertWithoutVideosInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleUpdateWithoutVideosInputObjectSchema } from './DanceStyleUpdateWithoutVideosInput.schema'
import { DanceStyleUncheckedUpdateWithoutVideosInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutVideosInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpdateOneRequiredWithoutVideosNestedInput> =
  z
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
      upsert: z
        .lazy(() => DanceStyleUpsertWithoutVideosInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DanceStyleUpdateWithoutVideosInputObjectSchema),
          z.lazy(() => DanceStyleUncheckedUpdateWithoutVideosInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const DanceStyleUpdateOneRequiredWithoutVideosNestedInputObjectSchema =
  Schema
