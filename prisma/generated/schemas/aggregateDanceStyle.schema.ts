import { z } from 'zod'
import { DanceStyleOrderByWithRelationInputObjectSchema } from './objects/DanceStyleOrderByWithRelationInput.schema'
import { DanceStyleWhereInputObjectSchema } from './objects/DanceStyleWhereInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './objects/DanceStyleWhereUniqueInput.schema'
import { DanceStyleCountAggregateInputObjectSchema } from './objects/DanceStyleCountAggregateInput.schema'
import { DanceStyleMinAggregateInputObjectSchema } from './objects/DanceStyleMinAggregateInput.schema'
import { DanceStyleMaxAggregateInputObjectSchema } from './objects/DanceStyleMaxAggregateInput.schema'
import { DanceStyleAvgAggregateInputObjectSchema } from './objects/DanceStyleAvgAggregateInput.schema'
import { DanceStyleSumAggregateInputObjectSchema } from './objects/DanceStyleSumAggregateInput.schema'

export const DanceStyleAggregateSchema = z.object({
  orderBy: z
    .union([
      DanceStyleOrderByWithRelationInputObjectSchema,
      DanceStyleOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DanceStyleWhereInputObjectSchema.optional(),
  cursor: DanceStyleWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), DanceStyleCountAggregateInputObjectSchema])
    .optional(),
  _min: DanceStyleMinAggregateInputObjectSchema.optional(),
  _max: DanceStyleMaxAggregateInputObjectSchema.optional(),
  _avg: DanceStyleAvgAggregateInputObjectSchema.optional(),
  _sum: DanceStyleSumAggregateInputObjectSchema.optional(),
})
