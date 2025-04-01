import { z } from 'zod'
import { CitySelectObjectSchema } from './objects/CitySelect.schema'
import { CityIncludeObjectSchema } from './objects/CityInclude.schema'
import { CityOrderByWithRelationInputObjectSchema } from './objects/CityOrderByWithRelationInput.schema'
import { CityWhereInputObjectSchema } from './objects/CityWhereInput.schema'
import { CityWhereUniqueInputObjectSchema } from './objects/CityWhereUniqueInput.schema'
import { CityScalarFieldEnumSchema } from './enums/CityScalarFieldEnum.schema'

export const CityFindFirstSchema = z.object({
  select: CitySelectObjectSchema.optional(),
  include: CityIncludeObjectSchema.optional(),
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
  distinct: z.array(CityScalarFieldEnumSchema).optional(),
})
