import { z } from 'zod'
import { CourseArgsObjectSchema } from './CourseArgs.schema'
import { CourseLessonFindManySchema } from '../findManyCourseLesson.schema'
import { CourseModuleCountOutputTypeArgsObjectSchema } from './CourseModuleCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    order: z.boolean().optional(),
    description: z.boolean().optional(),
    courseId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
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

export const CourseModuleSelectObjectSchema = Schema
