import { z } from 'zod'
import { ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema'

export const ProfileDeleteManySchema = z.object({
  where: ProfileWhereInputObjectSchema.optional(),
})
