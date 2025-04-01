import { z } from 'zod'
import { ProfileFollowerSelectObjectSchema } from './objects/ProfileFollowerSelect.schema'
import { ProfileFollowerIncludeObjectSchema } from './objects/ProfileFollowerInclude.schema'
import { ProfileFollowerOrderByWithRelationInputObjectSchema } from './objects/ProfileFollowerOrderByWithRelationInput.schema'
import { ProfileFollowerWhereInputObjectSchema } from './objects/ProfileFollowerWhereInput.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './objects/ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerScalarFieldEnumSchema } from './enums/ProfileFollowerScalarFieldEnum.schema'

export const ProfileFollowerFindFirstSchema = z.object({
  select: ProfileFollowerSelectObjectSchema.optional(),
  include: ProfileFollowerIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      ProfileFollowerOrderByWithRelationInputObjectSchema,
      ProfileFollowerOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProfileFollowerWhereInputObjectSchema.optional(),
  cursor: ProfileFollowerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ProfileFollowerScalarFieldEnumSchema).optional(),
})
