import { z } from 'zod'
import { CourseModuleOrderByWithRelationInputObjectSchema } from './objects/CourseModuleOrderByWithRelationInput.schema'
import { CourseModuleWhereInputObjectSchema } from './objects/CourseModuleWhereInput.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './objects/CourseModuleWhereUniqueInput.schema'
import { CourseModuleCountAggregateInputObjectSchema } from './objects/CourseModuleCountAggregateInput.schema'
import { CourseModuleMinAggregateInputObjectSchema } from './objects/CourseModuleMinAggregateInput.schema'
import { CourseModuleMaxAggregateInputObjectSchema } from './objects/CourseModuleMaxAggregateInput.schema'
import { CourseModuleAvgAggregateInputObjectSchema } from './objects/CourseModuleAvgAggregateInput.schema'
import { CourseModuleSumAggregateInputObjectSchema } from './objects/CourseModuleSumAggregateInput.schema'

export const CourseModuleAggregateSchema = z.object({
  orderBy: z
    .union([
      CourseModuleOrderByWithRelationInputObjectSchema,
      CourseModuleOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseModuleWhereInputObjectSchema.optional(),
  cursor: CourseModuleWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CourseModuleCountAggregateInputObjectSchema])
    .optional(),
  _min: CourseModuleMinAggregateInputObjectSchema.optional(),
  _max: CourseModuleMaxAggregateInputObjectSchema.optional(),
  _avg: CourseModuleAvgAggregateInputObjectSchema.optional(),
  _sum: CourseModuleSumAggregateInputObjectSchema.optional(),
})
