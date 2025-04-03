import { z } from 'zod'
import { CourseLessonCreateNestedManyWithoutModuleInputObjectSchema } from './CourseLessonCreateNestedManyWithoutModuleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleCreateWithoutCourseInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    order: z.number(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    lessons: z
      .lazy(() => CourseLessonCreateNestedManyWithoutModuleInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseModuleCreateWithoutCourseInputObjectSchema = Schema
