import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseLessonScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CourseLessonScalarWhereInputObjectSchema),
        z.lazy(() => CourseLessonScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CourseLessonScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CourseLessonScalarWhereInputObjectSchema),
        z.lazy(() => CourseLessonScalarWhereInputObjectSchema).array(),
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
  })
  .strict()

export const CourseLessonScalarWhereInputObjectSchema = Schema
