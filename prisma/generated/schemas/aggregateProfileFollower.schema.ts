import { z } from 'zod'
import { ProfileFollowerOrderByWithRelationInputObjectSchema } from './objects/ProfileFollowerOrderByWithRelationInput.schema'
import { ProfileFollowerWhereInputObjectSchema } from './objects/ProfileFollowerWhereInput.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './objects/ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerCountAggregateInputObjectSchema } from './objects/ProfileFollowerCountAggregateInput.schema'
import { ProfileFollowerMinAggregateInputObjectSchema } from './objects/ProfileFollowerMinAggregateInput.schema'
import { ProfileFollowerMaxAggregateInputObjectSchema } from './objects/ProfileFollowerMaxAggregateInput.schema'
import { ProfileFollowerAvgAggregateInputObjectSchema } from './objects/ProfileFollowerAvgAggregateInput.schema'
import { ProfileFollowerSumAggregateInputObjectSchema } from './objects/ProfileFollowerSumAggregateInput.schema'

export const ProfileFollowerAggregateSchema = z.object({
  orderBy: z
    .union([
      ProfileFollowerOrderByWithRelationInputObjectSchema,
      ProfileFollowerOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProfileFollowerWhereInputObjectSchema.optional(),
  cursor: ProfileFollowerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ProfileFollowerCountAggregateInputObjectSchema])
    .optional(),
  _min: ProfileFollowerMinAggregateInputObjectSchema.optional(),
  _max: ProfileFollowerMaxAggregateInputObjectSchema.optional(),
  _avg: ProfileFollowerAvgAggregateInputObjectSchema.optional(),
  _sum: ProfileFollowerSumAggregateInputObjectSchema.optional(),
})
