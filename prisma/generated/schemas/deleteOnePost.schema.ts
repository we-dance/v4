import { z } from 'zod'
import { PostSelectObjectSchema } from './objects/PostSelect.schema'
import { PostIncludeObjectSchema } from './objects/PostInclude.schema'
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema'

export const PostDeleteOneSchema = z.object({
  select: PostSelectObjectSchema.optional(),
  include: PostIncludeObjectSchema.optional(),
  where: PostWhereUniqueInputObjectSchema,
})
