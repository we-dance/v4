import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { CourseModuleRelationFilterObjectSchema } from './CourseModuleRelationFilter.schema'
import { CourseModuleWhereInputObjectSchema } from './CourseModuleWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CourseLessonWhereInputObjectSchema),
        z.lazy(() => CourseLessonWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CourseLessonWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CourseLessonWhereInputObjectSchema),
        z.lazy(() => CourseLessonWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    duration: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    videoId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    locked: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    moduleId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    module: z
      .union([
        z.lazy(() => CourseModuleRelationFilterObjectSchema),
        z.lazy(() => CourseModuleWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const CourseLessonWhereInputObjectSchema = Schema
