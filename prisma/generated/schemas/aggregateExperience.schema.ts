import { z } from 'zod'
import { ExperienceOrderByWithRelationInputObjectSchema } from './objects/ExperienceOrderByWithRelationInput.schema'
import { ExperienceWhereInputObjectSchema } from './objects/ExperienceWhereInput.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './objects/ExperienceWhereUniqueInput.schema'
import { ExperienceCountAggregateInputObjectSchema } from './objects/ExperienceCountAggregateInput.schema'
import { ExperienceMinAggregateInputObjectSchema } from './objects/ExperienceMinAggregateInput.schema'
import { ExperienceMaxAggregateInputObjectSchema } from './objects/ExperienceMaxAggregateInput.schema'
import { ExperienceAvgAggregateInputObjectSchema } from './objects/ExperienceAvgAggregateInput.schema'
import { ExperienceSumAggregateInputObjectSchema } from './objects/ExperienceSumAggregateInput.schema'

export const ExperienceAggregateSchema = z.object({
  orderBy: z
    .union([
      ExperienceOrderByWithRelationInputObjectSchema,
      ExperienceOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ExperienceWhereInputObjectSchema.optional(),
  cursor: ExperienceWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ExperienceCountAggregateInputObjectSchema])
    .optional(),
  _min: ExperienceMinAggregateInputObjectSchema.optional(),
  _max: ExperienceMaxAggregateInputObjectSchema.optional(),
  _avg: ExperienceAvgAggregateInputObjectSchema.optional(),
  _sum: ExperienceSumAggregateInputObjectSchema.optional(),
})
