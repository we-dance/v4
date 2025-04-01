import { z } from 'zod'
import { ProfileFollowerSelectObjectSchema } from './objects/ProfileFollowerSelect.schema'
import { ProfileFollowerIncludeObjectSchema } from './objects/ProfileFollowerInclude.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './objects/ProfileFollowerWhereUniqueInput.schema'

export const ProfileFollowerFindUniqueSchema = z.object({
  select: ProfileFollowerSelectObjectSchema.optional(),
  include: ProfileFollowerIncludeObjectSchema.optional(),
  where: ProfileFollowerWhereUniqueInputObjectSchema,
})
