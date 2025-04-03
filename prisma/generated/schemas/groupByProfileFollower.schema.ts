import { z } from 'zod'
import { ProfileFollowerWhereInputObjectSchema } from './objects/ProfileFollowerWhereInput.schema'
import { ProfileFollowerOrderByWithAggregationInputObjectSchema } from './objects/ProfileFollowerOrderByWithAggregationInput.schema'
import { ProfileFollowerScalarWhereWithAggregatesInputObjectSchema } from './objects/ProfileFollowerScalarWhereWithAggregatesInput.schema'
import { ProfileFollowerScalarFieldEnumSchema } from './enums/ProfileFollowerScalarFieldEnum.schema'

export const ProfileFollowerGroupBySchema = z.object({
  where: ProfileFollowerWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ProfileFollowerOrderByWithAggregationInputObjectSchema,
      ProfileFollowerOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ProfileFollowerScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ProfileFollowerScalarFieldEnumSchema),
})
