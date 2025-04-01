import { z } from 'zod'
import { ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema'
import { ProfileOrderByWithAggregationInputObjectSchema } from './objects/ProfileOrderByWithAggregationInput.schema'
import { ProfileScalarWhereWithAggregatesInputObjectSchema } from './objects/ProfileScalarWhereWithAggregatesInput.schema'
import { ProfileScalarFieldEnumSchema } from './enums/ProfileScalarFieldEnum.schema'

export const ProfileGroupBySchema = z.object({
  where: ProfileWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ProfileOrderByWithAggregationInputObjectSchema,
      ProfileOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ProfileScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ProfileScalarFieldEnumSchema),
})
