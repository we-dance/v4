import { z } from 'zod'
import { GuestWhereInputObjectSchema } from './objects/GuestWhereInput.schema'
import { GuestOrderByWithAggregationInputObjectSchema } from './objects/GuestOrderByWithAggregationInput.schema'
import { GuestScalarWhereWithAggregatesInputObjectSchema } from './objects/GuestScalarWhereWithAggregatesInput.schema'
import { GuestScalarFieldEnumSchema } from './enums/GuestScalarFieldEnum.schema'

export const GuestGroupBySchema = z.object({
  where: GuestWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      GuestOrderByWithAggregationInputObjectSchema,
      GuestOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: GuestScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(GuestScalarFieldEnumSchema),
})
