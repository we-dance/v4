import { z } from 'zod'
import { ProfileFollowerSelectObjectSchema } from './objects/ProfileFollowerSelect.schema'
import { ProfileFollowerIncludeObjectSchema } from './objects/ProfileFollowerInclude.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './objects/ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerCreateInputObjectSchema } from './objects/ProfileFollowerCreateInput.schema'
import { ProfileFollowerUncheckedCreateInputObjectSchema } from './objects/ProfileFollowerUncheckedCreateInput.schema'
import { ProfileFollowerUpdateInputObjectSchema } from './objects/ProfileFollowerUpdateInput.schema'
import { ProfileFollowerUncheckedUpdateInputObjectSchema } from './objects/ProfileFollowerUncheckedUpdateInput.schema'

export const ProfileFollowerUpsertSchema = z.object({
  select: ProfileFollowerSelectObjectSchema.optional(),
  include: ProfileFollowerIncludeObjectSchema.optional(),
  where: ProfileFollowerWhereUniqueInputObjectSchema,
  create: z.union([
    ProfileFollowerCreateInputObjectSchema,
    ProfileFollowerUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ProfileFollowerUpdateInputObjectSchema,
    ProfileFollowerUncheckedUpdateInputObjectSchema,
  ]),
})
