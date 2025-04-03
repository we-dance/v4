import { z } from 'zod'
import { ProfileFollowerSelectObjectSchema } from './objects/ProfileFollowerSelect.schema'
import { ProfileFollowerIncludeObjectSchema } from './objects/ProfileFollowerInclude.schema'
import { ProfileFollowerUpdateInputObjectSchema } from './objects/ProfileFollowerUpdateInput.schema'
import { ProfileFollowerUncheckedUpdateInputObjectSchema } from './objects/ProfileFollowerUncheckedUpdateInput.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './objects/ProfileFollowerWhereUniqueInput.schema'

export const ProfileFollowerUpdateOneSchema = z.object({
  select: ProfileFollowerSelectObjectSchema.optional(),
  include: ProfileFollowerIncludeObjectSchema.optional(),
  data: z.union([
    ProfileFollowerUpdateInputObjectSchema,
    ProfileFollowerUncheckedUpdateInputObjectSchema,
  ]),
  where: ProfileFollowerWhereUniqueInputObjectSchema,
})
