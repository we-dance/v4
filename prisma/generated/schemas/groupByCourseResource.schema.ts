import { z } from 'zod'
import { CourseResourceWhereInputObjectSchema } from './objects/CourseResourceWhereInput.schema'
import { CourseResourceOrderByWithAggregationInputObjectSchema } from './objects/CourseResourceOrderByWithAggregationInput.schema'
import { CourseResourceScalarWhereWithAggregatesInputObjectSchema } from './objects/CourseResourceScalarWhereWithAggregatesInput.schema'
import { CourseResourceScalarFieldEnumSchema } from './enums/CourseResourceScalarFieldEnum.schema'

export const CourseResourceGroupBySchema = z.object({
  where: CourseResourceWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CourseResourceOrderByWithAggregationInputObjectSchema,
      CourseResourceOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CourseResourceScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CourseResourceScalarFieldEnumSchema),
})
