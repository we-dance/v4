import { z } from 'zod'
import { ProfileSelectObjectSchema } from './objects/ProfileSelect.schema'
import { ProfileIncludeObjectSchema } from './objects/ProfileInclude.schema'
import { ProfileCreateInputObjectSchema } from './objects/ProfileCreateInput.schema'
import { ProfileUncheckedCreateInputObjectSchema } from './objects/ProfileUncheckedCreateInput.schema'

export const ProfileCreateOneSchema = z.object({
  select: ProfileSelectObjectSchema.optional(),
  include: ProfileIncludeObjectSchema.optional(),
  data: z.union([
    ProfileCreateInputObjectSchema,
    ProfileUncheckedCreateInputObjectSchema,
  ]),
})
