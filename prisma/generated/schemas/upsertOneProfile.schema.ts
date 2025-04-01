import { z } from 'zod'
import { ProfileSelectObjectSchema } from './objects/ProfileSelect.schema'
import { ProfileIncludeObjectSchema } from './objects/ProfileInclude.schema'
import { ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema'
import { ProfileCreateInputObjectSchema } from './objects/ProfileCreateInput.schema'
import { ProfileUncheckedCreateInputObjectSchema } from './objects/ProfileUncheckedCreateInput.schema'
import { ProfileUpdateInputObjectSchema } from './objects/ProfileUpdateInput.schema'
import { ProfileUncheckedUpdateInputObjectSchema } from './objects/ProfileUncheckedUpdateInput.schema'

export const ProfileUpsertSchema = z.object({
  select: ProfileSelectObjectSchema.optional(),
  include: ProfileIncludeObjectSchema.optional(),
  where: ProfileWhereUniqueInputObjectSchema,
  create: z.union([
    ProfileCreateInputObjectSchema,
    ProfileUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ProfileUpdateInputObjectSchema,
    ProfileUncheckedUpdateInputObjectSchema,
  ]),
})
