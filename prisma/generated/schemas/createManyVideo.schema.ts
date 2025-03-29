import { z } from 'zod'
import { VideoCreateManyInputObjectSchema } from './objects/VideoCreateManyInput.schema'

export const VideoCreateManySchema = z.object({
  data: z.union([
    VideoCreateManyInputObjectSchema,
    z.array(VideoCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
