import { z } from 'zod'
import { CountrySelectObjectSchema } from './objects/CountrySelect.schema'
import { CountryIncludeObjectSchema } from './objects/CountryInclude.schema'
import { CountryCreateInputObjectSchema } from './objects/CountryCreateInput.schema'
import { CountryUncheckedCreateInputObjectSchema } from './objects/CountryUncheckedCreateInput.schema'

export const CountryCreateOneSchema = z.object({
  select: CountrySelectObjectSchema.optional(),
  include: CountryIncludeObjectSchema.optional(),
  data: z.union([
    CountryCreateInputObjectSchema,
    CountryUncheckedCreateInputObjectSchema,
  ]),
})
