import { z } from 'zod'
import { VideoUpdateManyMutationInputObjectSchema } from './objects/VideoUpdateManyMutationInput.schema'
import { VideoWhereInputObjectSchema } from './objects/VideoWhereInput.schema'

export const VideoUpdateManySchema = z.object({
  data: VideoUpdateManyMutationInputObjectSchema,
  where: VideoWhereInputObjectSchema.optional(),
})
