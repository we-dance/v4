import { z } from 'zod'
import { CourseWhereInputObjectSchema } from './objects/CourseWhereInput.schema'
import { CourseOrderByWithAggregationInputObjectSchema } from './objects/CourseOrderByWithAggregationInput.schema'
import { CourseScalarWhereWithAggregatesInputObjectSchema } from './objects/CourseScalarWhereWithAggregatesInput.schema'
import { CourseScalarFieldEnumSchema } from './enums/CourseScalarFieldEnum.schema'

export const CourseGroupBySchema = z.object({
  where: CourseWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CourseOrderByWithAggregationInputObjectSchema,
      CourseOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CourseScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CourseScalarFieldEnumSchema),
})
