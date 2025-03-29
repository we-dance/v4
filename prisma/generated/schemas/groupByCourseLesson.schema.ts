import { z } from 'zod'
import { CourseLessonWhereInputObjectSchema } from './objects/CourseLessonWhereInput.schema'
import { CourseLessonOrderByWithAggregationInputObjectSchema } from './objects/CourseLessonOrderByWithAggregationInput.schema'
import { CourseLessonScalarWhereWithAggregatesInputObjectSchema } from './objects/CourseLessonScalarWhereWithAggregatesInput.schema'
import { CourseLessonScalarFieldEnumSchema } from './enums/CourseLessonScalarFieldEnum.schema'

export const CourseLessonGroupBySchema = z.object({
  where: CourseLessonWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CourseLessonOrderByWithAggregationInputObjectSchema,
      CourseLessonOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CourseLessonScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CourseLessonScalarFieldEnumSchema),
})
