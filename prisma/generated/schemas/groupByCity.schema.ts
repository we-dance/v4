import { z } from 'zod'
import { CityWhereInputObjectSchema } from './objects/CityWhereInput.schema'
import { CityOrderByWithAggregationInputObjectSchema } from './objects/CityOrderByWithAggregationInput.schema'
import { CityScalarWhereWithAggregatesInputObjectSchema } from './objects/CityScalarWhereWithAggregatesInput.schema'
import { CityScalarFieldEnumSchema } from './enums/CityScalarFieldEnum.schema'

export const CityGroupBySchema = z.object({
  where: CityWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      CityOrderByWithAggregationInputObjectSchema,
      CityOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: CityScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(CityScalarFieldEnumSchema),
})
