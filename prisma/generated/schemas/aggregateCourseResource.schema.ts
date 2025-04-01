import { z } from 'zod'
import { CourseResourceOrderByWithRelationInputObjectSchema } from './objects/CourseResourceOrderByWithRelationInput.schema'
import { CourseResourceWhereInputObjectSchema } from './objects/CourseResourceWhereInput.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './objects/CourseResourceWhereUniqueInput.schema'
import { CourseResourceCountAggregateInputObjectSchema } from './objects/CourseResourceCountAggregateInput.schema'
import { CourseResourceMinAggregateInputObjectSchema } from './objects/CourseResourceMinAggregateInput.schema'
import { CourseResourceMaxAggregateInputObjectSchema } from './objects/CourseResourceMaxAggregateInput.schema'

export const CourseResourceAggregateSchema = z.object({
  orderBy: z
    .union([
      CourseResourceOrderByWithRelationInputObjectSchema,
      CourseResourceOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseResourceWhereInputObjectSchema.optional(),
  cursor: CourseResourceWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CourseResourceCountAggregateInputObjectSchema])
    .optional(),
  _min: CourseResourceMinAggregateInputObjectSchema.optional(),
  _max: CourseResourceMaxAggregateInputObjectSchema.optional(),
})
