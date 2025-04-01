import { z } from 'zod'
import { CountrySelectObjectSchema } from './objects/CountrySelect.schema'
import { CountryIncludeObjectSchema } from './objects/CountryInclude.schema'
import { CountryUpdateInputObjectSchema } from './objects/CountryUpdateInput.schema'
import { CountryUncheckedUpdateInputObjectSchema } from './objects/CountryUncheckedUpdateInput.schema'
import { CountryWhereUniqueInputObjectSchema } from './objects/CountryWhereUniqueInput.schema'

export const CountryUpdateOneSchema = z.object({
  select: CountrySelectObjectSchema.optional(),
  include: CountryIncludeObjectSchema.optional(),
  data: z.union([
    CountryUpdateInputObjectSchema,
    CountryUncheckedUpdateInputObjectSchema,
  ]),
  where: CountryWhereUniqueInputObjectSchema,
})
