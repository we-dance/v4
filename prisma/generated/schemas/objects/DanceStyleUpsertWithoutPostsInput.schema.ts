import { z } from 'zod'
import { DanceStyleUpdateWithoutPostsInputObjectSchema } from './DanceStyleUpdateWithoutPostsInput.schema'
import { DanceStyleUncheckedUpdateWithoutPostsInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutPostsInput.schema'
import { DanceStyleCreateWithoutPostsInputObjectSchema } from './DanceStyleCreateWithoutPostsInput.schema'
import { DanceStyleUncheckedCreateWithoutPostsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpsertWithoutPostsInput> = z
  .object({
    update: z.union([
      z.lazy(() => DanceStyleUpdateWithoutPostsInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedUpdateWithoutPostsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DanceStyleCreateWithoutPostsInputObjectSchema),
      z.lazy(() => DanceStyleUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const DanceStyleUpsertWithoutPostsInputObjectSchema = Schema
