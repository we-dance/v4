import { z } from 'zod'
import { CourseModuleCreateManyCourseInputObjectSchema } from './CourseModuleCreateManyCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateManyCourseInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CourseModuleCreateManyCourseInputObjectSchema),
      z.lazy(() => CourseModuleCreateManyCourseInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CourseModuleCreateManyCourseInputEnvelopeObjectSchema = Schema
