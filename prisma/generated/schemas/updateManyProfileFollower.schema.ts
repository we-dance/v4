import { z } from 'zod'
import { ProfileFollowerUpdateManyMutationInputObjectSchema } from './objects/ProfileFollowerUpdateManyMutationInput.schema'
import { ProfileFollowerWhereInputObjectSchema } from './objects/ProfileFollowerWhereInput.schema'

export const ProfileFollowerUpdateManySchema = z.object({
  data: ProfileFollowerUpdateManyMutationInputObjectSchema,
  where: ProfileFollowerWhereInputObjectSchema.optional(),
})
