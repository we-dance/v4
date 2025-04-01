import { z } from 'zod'
import { CourseArgsObjectSchema } from './CourseArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceInclude> = z
  .object({
    course: z
      .union([z.boolean(), z.lazy(() => CourseArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CourseResourceIncludeObjectSchema = Schema
