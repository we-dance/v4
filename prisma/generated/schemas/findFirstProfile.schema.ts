import { z } from 'zod'
import { ProfileSelectObjectSchema } from './objects/ProfileSelect.schema'
import { ProfileIncludeObjectSchema } from './objects/ProfileInclude.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './objects/ProfileOrderByWithRelationInput.schema'
import { ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema'
import { ProfileScalarFieldEnumSchema } from './enums/ProfileScalarFieldEnum.schema'

export const ProfileFindFirstSchema = z.object({
  select: ProfileSelectObjectSchema.optional(),
  include: ProfileIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      ProfileOrderByWithRelationInputObjectSchema,
      ProfileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ProfileWhereInputObjectSchema.optional(),
  cursor: ProfileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ProfileScalarFieldEnumSchema).optional(),
})
