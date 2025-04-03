import { z } from 'zod'
import { CitySelectObjectSchema } from './objects/CitySelect.schema'
import { CityIncludeObjectSchema } from './objects/CityInclude.schema'
import { CityWhereUniqueInputObjectSchema } from './objects/CityWhereUniqueInput.schema'

export const CityFindUniqueSchema = z.object({
  select: CitySelectObjectSchema.optional(),
  include: CityIncludeObjectSchema.optional(),
  where: CityWhereUniqueInputObjectSchema,
})
