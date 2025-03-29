import { z } from 'zod'
import { DanceStyleUpdateWithoutExperiencesInputObjectSchema } from './DanceStyleUpdateWithoutExperiencesInput.schema'
import { DanceStyleUncheckedUpdateWithoutExperiencesInputObjectSchema } from './DanceStyleUncheckedUpdateWithoutExperiencesInput.schema'
import { DanceStyleCreateWithoutExperiencesInputObjectSchema } from './DanceStyleCreateWithoutExperiencesInput.schema'
import { DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema } from './DanceStyleUncheckedCreateWithoutExperiencesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUpsertWithoutExperiencesInput> = z
  .object({
    update: z.union([
      z.lazy(() => DanceStyleUpdateWithoutExperiencesInputObjectSchema),
      z.lazy(
        () => DanceStyleUncheckedUpdateWithoutExperiencesInputObjectSchema
      ),
    ]),
    create: z.union([
      z.lazy(() => DanceStyleCreateWithoutExperiencesInputObjectSchema),
      z.lazy(
        () => DanceStyleUncheckedCreateWithoutExperiencesInputObjectSchema
      ),
    ]),
  })
  .strict()

export const DanceStyleUpsertWithoutExperiencesInputObjectSchema = Schema
