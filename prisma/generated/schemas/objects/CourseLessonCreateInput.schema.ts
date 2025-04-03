import { z } from 'zod'
import { CourseModuleCreateNestedOneWithoutLessonsInputObjectSchema } from './CourseModuleCreateNestedOneWithoutLessonsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    duration: z.number(),
    videoId: z.string(),
    locked: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    module: z.lazy(
      () => CourseModuleCreateNestedOneWithoutLessonsInputObjectSchema
    ),
  })
  .strict()

export const CourseLessonCreateInputObjectSchema = Schema
