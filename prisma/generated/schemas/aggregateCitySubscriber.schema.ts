import { z } from 'zod'
import { CitySubscriberOrderByWithRelationInputObjectSchema } from './objects/CitySubscriberOrderByWithRelationInput.schema'
import { CitySubscriberWhereInputObjectSchema } from './objects/CitySubscriberWhereInput.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './objects/CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberCountAggregateInputObjectSchema } from './objects/CitySubscriberCountAggregateInput.schema'
import { CitySubscriberMinAggregateInputObjectSchema } from './objects/CitySubscriberMinAggregateInput.schema'
import { CitySubscriberMaxAggregateInputObjectSchema } from './objects/CitySubscriberMaxAggregateInput.schema'
import { CitySubscriberAvgAggregateInputObjectSchema } from './objects/CitySubscriberAvgAggregateInput.schema'
import { CitySubscriberSumAggregateInputObjectSchema } from './objects/CitySubscriberSumAggregateInput.schema'

export const CitySubscriberAggregateSchema = z.object({
  orderBy: z
    .union([
      CitySubscriberOrderByWithRelationInputObjectSchema,
      CitySubscriberOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CitySubscriberWhereInputObjectSchema.optional(),
  cursor: CitySubscriberWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CitySubscriberCountAggregateInputObjectSchema])
    .optional(),
  _min: CitySubscriberMinAggregateInputObjectSchema.optional(),
  _max: CitySubscriberMaxAggregateInputObjectSchema.optional(),
  _avg: CitySubscriberAvgAggregateInputObjectSchema.optional(),
  _sum: CitySubscriberSumAggregateInputObjectSchema.optional(),
})
