import { z } from 'zod'
import { ProfileCreateManyInputObjectSchema } from './objects/ProfileCreateManyInput.schema'

export const ProfileCreateManySchema = z.object({
  data: z.union([
    ProfileCreateManyInputObjectSchema,
    z.array(ProfileCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
