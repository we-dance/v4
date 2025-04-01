import { z } from 'zod'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleCreateWithoutVideosInputObjectSchema } from './DanceStyleCreateWithoutVideosInput.schema'
import { DanceStyleUncheckedCreateWithoutVideosInputObjectSchema } from './DanceStyleUncheckedCreateWithoutVideosInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCreateOrConnectWithoutVideosInput> = z
  .object({
    where: z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DanceStyleCreateWithoutVideosInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedCreateWithoutVideosInputObjectSchema),
    ]),
  })
  .strict()

export const DanceStyleCreateOrConnectWithoutVideosInputObjectSchema = Schema
