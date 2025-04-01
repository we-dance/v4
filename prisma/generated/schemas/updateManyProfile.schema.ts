import { z } from 'zod'
import { ProfileUpdateManyMutationInputObjectSchema } from './objects/ProfileUpdateManyMutationInput.schema'
import { ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema'

export const ProfileUpdateManySchema = z.object({
  data: ProfileUpdateManyMutationInputObjectSchema,
  where: ProfileWhereInputObjectSchema.optional(),
})
