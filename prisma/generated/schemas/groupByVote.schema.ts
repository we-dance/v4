import { z } from 'zod'
import { VoteWhereInputObjectSchema } from './objects/VoteWhereInput.schema'
import { VoteOrderByWithAggregationInputObjectSchema } from './objects/VoteOrderByWithAggregationInput.schema'
import { VoteScalarWhereWithAggregatesInputObjectSchema } from './objects/VoteScalarWhereWithAggregatesInput.schema'
import { VoteScalarFieldEnumSchema } from './enums/VoteScalarFieldEnum.schema'

export const VoteGroupBySchema = z.object({
  where: VoteWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      VoteOrderByWithAggregationInputObjectSchema,
      VoteOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: VoteScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(VoteScalarFieldEnumSchema),
})
