import { z } from 'zod'
import { CourseCreateManyInstructorInputObjectSchema } from './CourseCreateManyInstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateManyInstructorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => CourseCreateManyInstructorInputObjectSchema),
      z.lazy(() => CourseCreateManyInstructorInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const CourseCreateManyInstructorInputEnvelopeObjectSchema = Schema
