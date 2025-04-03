import { z } from 'zod'
import { VideoSelectObjectSchema } from './objects/VideoSelect.schema'
import { VideoIncludeObjectSchema } from './objects/VideoInclude.schema'
import { VideoCreateInputObjectSchema } from './objects/VideoCreateInput.schema'
import { VideoUncheckedCreateInputObjectSchema } from './objects/VideoUncheckedCreateInput.schema'

export const VideoCreateOneSchema = z.object({
  select: VideoSelectObjectSchema.optional(),
  include: VideoIncludeObjectSchema.optional(),
  data: z.union([
    VideoCreateInputObjectSchema,
    VideoUncheckedCreateInputObjectSchema,
  ]),
})
