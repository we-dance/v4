import { z } from 'zod'
import { CourseLessonCreateManyModuleInputObjectSchema } from './CourseLessonCreateManyModuleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonCreateManyModuleInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CourseLessonCreateManyModuleInputObjectSchema),
      z.lazy(() => CourseLessonCreateManyModuleInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CourseLessonCreateManyModuleInputEnvelopeObjectSchema = Schema
