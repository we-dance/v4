import { z } from 'zod'
import { ProfileOrderByWithRelationInputObjectSchema } from './objects/ProfileOrderByWithRelationInput.schema'
import { ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema'
import { ProfileCountAggregateInputObjectSchema } from './objects/ProfileCountAggregateInput.schema'
import { ProfileMinAggregateInputObjectSchema } from './objects/ProfileMinAggregateInput.schema'
import { ProfileMaxAggregateInputObjectSchema } from './objects/ProfileMaxAggregateInput.schema'
import { ProfileAvgAggregateInputObjectSchema } from './objects/ProfileAvgAggregateInput.schema'
import { ProfileSumAggregateInputObjectSchema } from './objects/ProfileSumAggregateInput.schema'

export const ProfileAggregateSchema = z.object({
  orderBy: z
    .union([
      ProfileOrderByWithRelationInputObjectSchema,
      ProfileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProfileWhereInputObjectSchema.optional(),
  cursor: ProfileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ProfileCountAggregateInputObjectSchema])
    .optional(),
  _min: ProfileMinAggregateInputObjectSchema.optional(),
  _max: ProfileMaxAggregateInputObjectSchema.optional(),
  _avg: ProfileAvgAggregateInputObjectSchema.optional(),
  _sum: ProfileSumAggregateInputObjectSchema.optional(),
})
