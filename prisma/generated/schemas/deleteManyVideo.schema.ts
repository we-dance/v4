import { z } from 'zod'
import { VideoWhereInputObjectSchema } from './objects/VideoWhereInput.schema'

export const VideoDeleteManySchema = z.object({
  where: VideoWhereInputObjectSchema.optional(),
})
