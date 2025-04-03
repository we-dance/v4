import { z } from 'zod'
import { CityOrderByWithRelationInputObjectSchema } from './objects/CityOrderByWithRelationInput.schema'
import { CityWhereInputObjectSchema } from './objects/CityWhereInput.schema'
import { CityWhereUniqueInputObjectSchema } from './objects/CityWhereUniqueInput.schema'
import { CityCountAggregateInputObjectSchema } from './objects/CityCountAggregateInput.schema'
import { CityMinAggregateInputObjectSchema } from './objects/CityMinAggregateInput.schema'
import { CityMaxAggregateInputObjectSchema } from './objects/CityMaxAggregateInput.schema'
import { CityAvgAggregateInputObjectSchema } from './objects/CityAvgAggregateInput.schema'
import { CitySumAggregateInputObjectSchema } from './objects/CitySumAggregateInput.schema'

export const CityAggregateSchema = z.object({
  orderBy: z
    .union([
      CityOrderByWithRelationInputObjectSchema,
      CityOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CityWhereInputObjectSchema.optional(),
  cursor: CityWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), CityCountAggregateInputObjectSchema])
    .optional(),
  _min: CityMinAggregateInputObjectSchema.optional(),
  _max: CityMaxAggregateInputObjectSchema.optional(),
  _avg: CityAvgAggregateInputObjectSchema.optional(),
  _sum: CitySumAggregateInputObjectSchema.optional(),
})
