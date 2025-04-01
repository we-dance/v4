import { z } from 'zod'
import { DanceStyleUpdateWithoutVideosInputObjectSchema } from './DanceStyleUpdateWithoutVideosInput.schema'
import { DanceStyleUncheckedUpdateWithoutVideosInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutVideosInput.schema'
import { DanceStyleCreateWithoutVideosInputObjectSchema } from './DanceStyleCreateWithoutVideosInput.schema'
import { DanceStyleUncheckedCreateWithoutVideosInputObjectSchema } from './DanceStyleUncheckedCreateWithoutVideosInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpsertWithoutVideosInput> = z
  .object({
    update: z.union([
      z.lazy(() => DanceStyleUpdateWithoutVideosInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedUpdateWithoutVideosInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DanceStyleCreateWithoutVideosInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedCreateWithoutVideosInputObjectSchema),
    ]),
  })
  .strict()

export const DanceStyleUpsertWithoutVideosInputObjectSchema = Schema
