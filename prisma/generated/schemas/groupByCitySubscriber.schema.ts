import { z } from 'zod'
import { CitySubscriberWhereInputObjectSchema } from './objects/CitySubscriberWhereInput.schema'
import { CitySubscriberOrderByWithAggregationInputObjectSchema } from './objects/CitySubscriberOrderByWithAggregationInput.schema'
import { CitySubscriberScalarWhereWithAggregatesInputObjectSchema } from './objects/CitySubscriberScalarWhereWithAggregatesInput.schema'
import { CitySubscriberScalarFieldEnumSchema } from './enums/CitySubscriberScalarFieldEnum.schema'

export const CitySubscriberGroupBySchema = z.object({
  where: CitySubscriberWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CitySubscriberOrderByWithAggregationInputObjectSchema,
      CitySubscriberOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CitySubscriberScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CitySubscriberScalarFieldEnumSchema),
})
