import { z } from 'zod'
import { VideoSelectObjectSchema } from './objects/VideoSelect.schema'
import { VideoIncludeObjectSchema } from './objects/VideoInclude.schema'
import { VideoWhereUniqueInputObjectSchema } from './objects/VideoWhereUniqueInput.schema'

export const VideoFindUniqueSchema = z.object({
  select: VideoSelectObjectSchema.optional(),
  include: VideoIncludeObjectSchema.optional(),
  where: VideoWhereUniqueInputObjectSchema,
})
