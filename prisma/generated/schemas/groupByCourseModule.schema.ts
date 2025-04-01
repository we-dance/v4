import { z } from 'zod'
import { CourseModuleWhereInputObjectSchema } from './objects/CourseModuleWhereInput.schema'
import { CourseModuleOrderByWithAggregationInputObjectSchema } from './objects/CourseModuleOrderByWithAggregationInput.schema'
import { CourseModuleScalarWhereWithAggregatesInputObjectSchema } from './objects/CourseModuleScalarWhereWithAggregatesInput.schema'
import { CourseModuleScalarFieldEnumSchema } from './enums/CourseModuleScalarFieldEnum.schema'

export const CourseModuleGroupBySchema = z.object({
  where: CourseModuleWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CourseModuleOrderByWithAggregationInputObjectSchema,
      CourseModuleOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CourseModuleScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CourseModuleScalarFieldEnumSchema),
})
