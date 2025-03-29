import { z } from 'zod'
import { CourseLessonUncheckedCreateNestedManyWithoutModuleInputObjectSchema } from './CourseLessonUncheckedCreateNestedManyWithoutModuleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUncheckedCreateWithoutCourseInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      order: z.number(),
      description: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      lessons: z
        .lazy(
          () =>
            CourseLessonUncheckedCreateNestedManyWithoutModuleInputObjectSchema
        )
        .optional(),
    })
    .strict()

export const CourseModuleUncheckedCreateWithoutCourseInputObjectSchema = Schema
