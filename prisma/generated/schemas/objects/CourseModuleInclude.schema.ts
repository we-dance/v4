import { z } from 'zod'
import { CourseArgsObjectSchema } from './CourseArgs.schema'
import { CourseLessonFindManySchema } from '../findManyCourseLesson.schema'
import { CourseModuleCountOutputTypeArgsObjectSchema } from './CourseModuleCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleInclude> = z
  .object({
    course: z
      .union([z.boolean(), z.lazy(() => CourseArgsObjectSchema)])
      .optional(),
    lessons: z
      .union([z.boolean(), z.lazy(() => CourseLessonFindManySchema)])
      .optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => CourseModuleCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const CourseModuleIncludeObjectSchema = Schema
