import { z } from 'zod'
import { VideoWhereInputObjectSchema } from './objects/VideoWhereInput.schema'
import { VideoOrderByWithAggregationInputObjectSchema } from './objects/VideoOrderByWithAggregationInput.schema'
import { VideoScalarWhereWithAggregatesInputObjectSchema } from './objects/VideoScalarWhereWithAggregatesInput.schema'
import { VideoScalarFieldEnumSchema } from './enums/VideoScalarFieldEnum.schema'

export const VideoGroupBySchema = z.object({
  where: VideoWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      VideoOrderByWithAggregationInputObjectSchema,
      VideoOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: VideoScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(VideoScalarFieldEnumSchema),
})
