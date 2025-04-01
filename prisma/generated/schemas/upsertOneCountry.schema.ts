import { z } from 'zod'
import { CountrySelectObjectSchema } from './objects/CountrySelect.schema'
import { CountryIncludeObjectSchema } from './objects/CountryInclude.schema'
import { CountryWhereUniqueInputObjectSchema } from './objects/CountryWhereUniqueInput.schema'
import { CountryCreateInputObjectSchema } from './objects/CountryCreateInput.schema'
import { CountryUncheckedCreateInputObjectSchema } from './objects/CountryUncheckedCreateInput.schema'
import { CountryUpdateInputObjectSchema } from './objects/CountryUpdateInput.schema'
import { CountryUncheckedUpdateInputObjectSchema } from './objects/CountryUncheckedUpdateInput.schema'

export const CountryUpsertSchema = z.object({
  select: CountrySelectObjectSchema.optional(),
  include: CountryIncludeObjectSchema.optional(),
  where: CountryWhereUniqueInputObjectSchema,
  create: z.union([
    CountryCreateInputObjectSchema,
    CountryUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CountryUpdateInputObjectSchema,
    CountryUncheckedUpdateInputObjectSchema,
  ]),
})
