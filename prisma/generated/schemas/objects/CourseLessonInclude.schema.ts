import { z } from 'zod'
import { CourseModuleArgsObjectSchema } from './CourseModuleArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonInclude> = z
  .object({
    module: z
      .union([z.boolean(), z.lazy(() => CourseModuleArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const CourseLessonIncludeObjectSchema = Schema
