import { z } from 'zod'
import { OfferOrderByWithRelationInputObjectSchema } from './objects/OfferOrderByWithRelationInput.schema'
import { OfferWhereInputObjectSchema } from './objects/OfferWhereInput.schema'
import { OfferWhereUniqueInputObjectSchema } from './objects/OfferWhereUniqueInput.schema'
import { OfferCountAggregateInputObjectSchema } from './objects/OfferCountAggregateInput.schema'
import { OfferMinAggregateInputObjectSchema } from './objects/OfferMinAggregateInput.schema'
import { OfferMaxAggregateInputObjectSchema } from './objects/OfferMaxAggregateInput.schema'
import { OfferAvgAggregateInputObjectSchema } from './objects/OfferAvgAggregateInput.schema'
import { OfferSumAggregateInputObjectSchema } from './objects/OfferSumAggregateInput.schema'

export const OfferAggregateSchema = z.object({
  orderBy: z
    .union([
      OfferOrderByWithRelationInputObjectSchema,
      OfferOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: OfferWhereInputObjectSchema.optional(),
  cursor: OfferWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), OfferCountAggregateInputObjectSchema])
    .optional(),
  _min: OfferMinAggregateInputObjectSchema.optional(),
  _max: OfferMaxAggregateInputObjectSchema.optional(),
  _avg: OfferAvgAggregateInputObjectSchema.optional(),
  _sum: OfferSumAggregateInputObjectSchema.optional(),
})
