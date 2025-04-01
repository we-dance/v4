import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { CourseRelationFilterObjectSchema } from './CourseRelationFilter.schema'
import { CourseWhereInputObjectSchema } from './CourseWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CourseResourceWhereInputObjectSchema),
        z.lazy(() => CourseResourceWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CourseResourceWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CourseResourceWhereInputObjectSchema),
        z.lazy(() => CourseResourceWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    url: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    locked: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
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
  })
  .strict()

export const CourseResourceWhereInputObjectSchema = Schema
