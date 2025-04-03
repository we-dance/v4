import { z } from 'zod'
import { CourseResourceCreateManyCourseInputObjectSchema } from './CourseResourceCreateManyCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceCreateManyCourseInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CourseResourceCreateManyCourseInputObjectSchema),
      z.lazy(() => CourseResourceCreateManyCourseInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CourseResourceCreateManyCourseInputEnvelopeObjectSchema = Schema
