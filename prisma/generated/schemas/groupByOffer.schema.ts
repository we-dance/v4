import { z } from 'zod'
import { OfferWhereInputObjectSchema } from './objects/OfferWhereInput.schema'
import { OfferOrderByWithAggregationInputObjectSchema } from './objects/OfferOrderByWithAggregationInput.schema'
import { OfferScalarWhereWithAggregatesInputObjectSchema } from './objects/OfferScalarWhereWithAggregatesInput.schema'
import { OfferScalarFieldEnumSchema } from './enums/OfferScalarFieldEnum.schema'

export const OfferGroupBySchema = z.object({
  where: OfferWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      OfferOrderByWithAggregationInputObjectSchema,
      OfferOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: OfferScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(OfferScalarFieldEnumSchema),
})
