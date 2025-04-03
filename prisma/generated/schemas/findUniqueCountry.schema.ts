import { z } from 'zod'
import { CountrySelectObjectSchema } from './objects/CountrySelect.schema'
import { CountryIncludeObjectSchema } from './objects/CountryInclude.schema'
import { CountryWhereUniqueInputObjectSchema } from './objects/CountryWhereUniqueInput.schema'

export const CountryFindUniqueSchema = z.object({
  select: CountrySelectObjectSchema.optional(),
  include: CountryIncludeObjectSchema.optional(),
  where: CountryWhereUniqueInputObjectSchema,
})
