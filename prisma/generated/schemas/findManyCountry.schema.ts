import { z } from 'zod'
import { CountrySelectObjectSchema } from './objects/CountrySelect.schema'
import { CountryIncludeObjectSchema } from './objects/CountryInclude.schema'
import { CountryOrderByWithRelationInputObjectSchema } from './objects/CountryOrderByWithRelationInput.schema'
import { CountryWhereInputObjectSchema } from './objects/CountryWhereInput.schema'
import { CountryWhereUniqueInputObjectSchema } from './objects/CountryWhereUniqueInput.schema'
import { CountryScalarFieldEnumSchema } from './enums/CountryScalarFieldEnum.schema'

export const CountryFindManySchema = z.object({
  select: z.lazy(() => CountrySelectObjectSchema.optional()),
  include: z.lazy(() => CountryIncludeObjectSchema.optional()),
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
  distinct: z.array(CountryScalarFieldEnumSchema).optional(),
})
