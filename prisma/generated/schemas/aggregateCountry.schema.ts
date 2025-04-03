import { z } from 'zod'
import { CountryOrderByWithRelationInputObjectSchema } from './objects/CountryOrderByWithRelationInput.schema'
import { CountryWhereInputObjectSchema } from './objects/CountryWhereInput.schema'
import { CountryWhereUniqueInputObjectSchema } from './objects/CountryWhereUniqueInput.schema'
import { CountryMinAggregateInputObjectSchema } from './objects/CountryMinAggregateInput.schema'
import { CountryMaxAggregateInputObjectSchema } from './objects/CountryMaxAggregateInput.schema'

export const CountryAggregateSchema = z.object({
  orderBy: z
    .union([
      CountryOrderByWithRelationInputObjectSchema,
      CountryOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CountryWhereInputObjectSchema.optional(),
  cursor: CountryWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _min: CountryMinAggregateInputObjectSchema.optional(),
  _max: CountryMaxAggregateInputObjectSchema.optional(),
})
