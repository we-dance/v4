import { z } from 'zod'
import { PostSelectObjectSchema } from './objects/PostSelect.schema'
import { PostIncludeObjectSchema } from './objects/PostInclude.schema'
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema'
import { PostCreateInputObjectSchema } from './objects/PostCreateInput.schema'
import { PostUncheckedCreateInputObjectSchema } from './objects/PostUncheckedCreateInput.schema'
import { PostUpdateInputObjectSchema } from './objects/PostUpdateInput.schema'
import { PostUncheckedUpdateInputObjectSchema } from './objects/PostUncheckedUpdateInput.schema'

export const PostUpsertSchema = z.object({
  select: PostSelectObjectSchema.optional(),
  include: PostIncludeObjectSchema.optional(),
  where: PostWhereUniqueInputObjectSchema,
  create: z.union([
    PostCreateInputObjectSchema,
    PostUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    PostUpdateInputObjectSchema,
    PostUncheckedUpdateInputObjectSchema,
  ]),
})
