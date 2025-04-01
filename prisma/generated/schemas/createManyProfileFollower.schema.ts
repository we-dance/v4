import { z } from 'zod'
import { ProfileFollowerCreateManyInputObjectSchema } from './objects/ProfileFollowerCreateManyInput.schema'

export const ProfileFollowerCreateManySchema = z.object({
  data: z.union([
    ProfileFollowerCreateManyInputObjectSchema,
    z.array(ProfileFollowerCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
