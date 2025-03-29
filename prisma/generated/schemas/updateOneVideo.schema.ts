import { z } from 'zod'
import { VideoSelectObjectSchema } from './objects/VideoSelect.schema'
import { VideoIncludeObjectSchema } from './objects/VideoInclude.schema'
import { VideoUpdateInputObjectSchema } from './objects/VideoUpdateInput.schema'
import { VideoUncheckedUpdateInputObjectSchema } from './objects/VideoUncheckedUpdateInput.schema'
import { VideoWhereUniqueInputObjectSchema } from './objects/VideoWhereUniqueInput.schema'

export const VideoUpdateOneSchema = z.object({
  select: VideoSelectObjectSchema.optional(),
  include: VideoIncludeObjectSchema.optional(),
  data: z.union([
    VideoUpdateInputObjectSchema,
    VideoUncheckedUpdateInputObjectSchema,
  ]),
  where: VideoWhereUniqueInputObjectSchema,
})
