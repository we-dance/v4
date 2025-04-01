import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { CourseRelationFilterObjectSchema } from './CourseRelationFilter.schema'
import { CourseWhereInputObjectSchema } from './CourseWhereInput.schema'
import { CourseLessonListRelationFilterObjectSchema } from './CourseLessonListRelationFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CourseModuleWhereInputObjectSchema),
        z.lazy(() => CourseModuleWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CourseModuleWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CourseModuleWhereInputObjectSchema),
        z.lazy(() => CourseModuleWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    order: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    courseId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    course: z
      .union([
        z.lazy(() => CourseRelationFilterObjectSchema),
        z.lazy(() => CourseWhereInputObjectSchema),
      ])
      .optional(),
    lessons: z
      .lazy(() => CourseLessonListRelationFilterObjectSchema)
      .optional(),
  })
  .strict()

export const CourseModuleWhereInputObjectSchema = Schema
