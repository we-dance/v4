import { z } from 'zod'
import { VideoSelectObjectSchema } from './objects/VideoSelect.schema'
import { VideoIncludeObjectSchema } from './objects/VideoInclude.schema'
import { VideoWhereUniqueInputObjectSchema } from './objects/VideoWhereUniqueInput.schema'
import { VideoCreateInputObjectSchema } from './objects/VideoCreateInput.schema'
import { VideoUncheckedCreateInputObjectSchema } from './objects/VideoUncheckedCreateInput.schema'
import { VideoUpdateInputObjectSchema } from './objects/VideoUpdateInput.schema'
import { VideoUncheckedUpdateInputObjectSchema } from './objects/VideoUncheckedUpdateInput.schema'

export const VideoUpsertSchema = z.object({
  select: VideoSelectObjectSchema.optional(),
  include: VideoIncludeObjectSchema.optional(),
  where: VideoWhereUniqueInputObjectSchema,
  create: z.union([
    VideoCreateInputObjectSchema,
    VideoUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    VideoUpdateInputObjectSchema,
    VideoUncheckedUpdateInputObjectSchema,
  ]),
})
