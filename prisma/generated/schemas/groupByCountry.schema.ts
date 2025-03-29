import { z } from 'zod'
import { CountryWhereInputObjectSchema } from './objects/CountryWhereInput.schema'
import { CountryOrderByWithAggregationInputObjectSchema } from './objects/CountryOrderByWithAggregationInput.schema'
import { CountryScalarWhereWithAggregatesInputObjectSchema } from './objects/CountryScalarWhereWithAggregatesInput.schema'
import { CountryScalarFieldEnumSchema } from './enums/CountryScalarFieldEnum.schema'

export const CountryGroupBySchema = z.object({
  where: CountryWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CountryOrderByWithAggregationInputObjectSchema,
      CountryOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CountryScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CountryScalarFieldEnumSchema),
})
