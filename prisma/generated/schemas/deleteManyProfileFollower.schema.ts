import { z } from 'zod'
import { ProfileFollowerWhereInputObjectSchema } from './objects/ProfileFollowerWhereInput.schema'

export const ProfileFollowerDeleteManySchema = z.object({
  where: ProfileFollowerWhereInputObjectSchema.optional(),
})
