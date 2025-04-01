import { z } from 'zod'
import { PostSelectObjectSchema } from './objects/PostSelect.schema'
import { PostIncludeObjectSchema } from './objects/PostInclude.schema'
import { PostCreateInputObjectSchema } from './objects/PostCreateInput.schema'
import { PostUncheckedCreateInputObjectSchema } from './objects/PostUncheckedCreateInput.schema'

export const PostCreateOneSchema = z.object({
  select: PostSelectObjectSchema.optional(),
  include: PostIncludeObjectSchema.optional(),
  data: z.union([
    PostCreateInputObjectSchema,
    PostUncheckedCreateInputObjectSchema,
  ]),
})
