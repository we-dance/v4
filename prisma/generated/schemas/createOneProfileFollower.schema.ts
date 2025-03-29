import { z } from 'zod'
import { ProfileFollowerSelectObjectSchema } from './objects/ProfileFollowerSelect.schema'
import { ProfileFollowerIncludeObjectSchema } from './objects/ProfileFollowerInclude.schema'
import { ProfileFollowerCreateInputObjectSchema } from './objects/ProfileFollowerCreateInput.schema'
import { ProfileFollowerUncheckedCreateInputObjectSchema } from './objects/ProfileFollowerUncheckedCreateInput.schema'

export const ProfileFollowerCreateOneSchema = z.object({
  select: ProfileFollowerSelectObjectSchema.optional(),
  include: ProfileFollowerIncludeObjectSchema.optional(),
  data: z.union([
    ProfileFollowerCreateInputObjectSchema,
    ProfileFollowerUncheckedCreateInputObjectSchema,
  ]),
})
