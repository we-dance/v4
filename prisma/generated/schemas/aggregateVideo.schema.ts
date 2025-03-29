import { z } from 'zod'
import { VideoOrderByWithRelationInputObjectSchema } from './objects/VideoOrderByWithRelationInput.schema'
import { VideoWhereInputObjectSchema } from './objects/VideoWhereInput.schema'
import { VideoWhereUniqueInputObjectSchema } from './objects/VideoWhereUniqueInput.schema'
import { VideoCountAggregateInputObjectSchema } from './objects/VideoCountAggregateInput.schema'
import { VideoMinAggregateInputObjectSchema } from './objects/VideoMinAggregateInput.schema'
import { VideoMaxAggregateInputObjectSchema } from './objects/VideoMaxAggregateInput.schema'
import { VideoAvgAggregateInputObjectSchema } from './objects/VideoAvgAggregateInput.schema'
import { VideoSumAggregateInputObjectSchema } from './objects/VideoSumAggregateInput.schema'

export const VideoAggregateSchema = z.object({
  orderBy: z
    .union([
      VideoOrderByWithRelationInputObjectSchema,
      VideoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: VideoWhereInputObjectSchema.optional(),
  cursor: VideoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), VideoCountAggregateInputObjectSchema])
    .optional(),
  _min: VideoMinAggregateInputObjectSchema.optional(),
  _max: VideoMaxAggregateInputObjectSchema.optional(),
  _avg: VideoAvgAggregateInputObjectSchema.optional(),
  _sum: VideoSumAggregateInputObjectSchema.optional(),
})
