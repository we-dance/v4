import { z } from 'zod'
import { PostOrderByWithRelationInputObjectSchema } from './objects/PostOrderByWithRelationInput.schema'
import { PostWhereInputObjectSchema } from './objects/PostWhereInput.schema'
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema'
import { PostCountAggregateInputObjectSchema } from './objects/PostCountAggregateInput.schema'
import { PostMinAggregateInputObjectSchema } from './objects/PostMinAggregateInput.schema'
import { PostMaxAggregateInputObjectSchema } from './objects/PostMaxAggregateInput.schema'
import { PostAvgAggregateInputObjectSchema } from './objects/PostAvgAggregateInput.schema'
import { PostSumAggregateInputObjectSchema } from './objects/PostSumAggregateInput.schema'

export const PostAggregateSchema = z.object({
  orderBy: z
    .union([
      PostOrderByWithRelationInputObjectSchema,
      PostOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PostWhereInputObjectSchema.optional(),
  cursor: PostWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), PostCountAggregateInputObjectSchema])
    .optional(),
  _min: PostMinAggregateInputObjectSchema.optional(),
  _max: PostMaxAggregateInputObjectSchema.optional(),
  _avg: PostAvgAggregateInputObjectSchema.optional(),
  _sum: PostSumAggregateInputObjectSchema.optional(),
})
