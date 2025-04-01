import { z } from 'zod'
import { CourseLessonOrderByWithRelationInputObjectSchema } from './objects/CourseLessonOrderByWithRelationInput.schema'
import { CourseLessonWhereInputObjectSchema } from './objects/CourseLessonWhereInput.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './objects/CourseLessonWhereUniqueInput.schema'
import { CourseLessonCountAggregateInputObjectSchema } from './objects/CourseLessonCountAggregateInput.schema'
import { CourseLessonMinAggregateInputObjectSchema } from './objects/CourseLessonMinAggregateInput.schema'
import { CourseLessonMaxAggregateInputObjectSchema } from './objects/CourseLessonMaxAggregateInput.schema'
import { CourseLessonAvgAggregateInputObjectSchema } from './objects/CourseLessonAvgAggregateInput.schema'
import { CourseLessonSumAggregateInputObjectSchema } from './objects/CourseLessonSumAggregateInput.schema'

export const CourseLessonAggregateSchema = z.object({
  orderBy: z
    .union([
      CourseLessonOrderByWithRelationInputObjectSchema,
      CourseLessonOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseLessonWhereInputObjectSchema.optional(),
  cursor: CourseLessonWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CourseLessonCountAggregateInputObjectSchema])
    .optional(),
  _min: CourseLessonMinAggregateInputObjectSchema.optional(),
  _max: CourseLessonMaxAggregateInputObjectSchema.optional(),
  _avg: CourseLessonAvgAggregateInputObjectSchema.optional(),
  _sum: CourseLessonSumAggregateInputObjectSchema.optional(),
})
