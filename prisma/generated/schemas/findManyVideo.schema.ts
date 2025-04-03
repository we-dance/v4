import { z } from 'zod'
import { VideoSelectObjectSchema } from './objects/VideoSelect.schema'
import { VideoIncludeObjectSchema } from './objects/VideoInclude.schema'
import { VideoOrderByWithRelationInputObjectSchema } from './objects/VideoOrderByWithRelationInput.schema'
import { VideoWhereInputObjectSchema } from './objects/VideoWhereInput.schema'
import { VideoWhereUniqueInputObjectSchema } from './objects/VideoWhereUniqueInput.schema'
import { VideoScalarFieldEnumSchema } from './enums/VideoScalarFieldEnum.schema'

export const VideoFindManySchema = z.object({
  select: z.lazy(() => VideoSelectObjectSchema.optional()),
  include: z.lazy(() => VideoIncludeObjectSchema.optional()),
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
  distinct: z.array(VideoScalarFieldEnumSchema).optional(),
})
