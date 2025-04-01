import { z } from 'zod'
import { CitySelectObjectSchema } from './objects/CitySelect.schema'
import { CityIncludeObjectSchema } from './objects/CityInclude.schema'
import { CityCreateInputObjectSchema } from './objects/CityCreateInput.schema'
import { CityUncheckedCreateInputObjectSchema } from './objects/CityUncheckedCreateInput.schema'

export const CityCreateOneSchema = z.object({
  select: CitySelectObjectSchema.optional(),
  include: CityIncludeObjectSchema.optional(),
  data: z.union([
    CityCreateInputObjectSchema,
    CityUncheckedCreateInputObjectSchema,
  ]),
})
