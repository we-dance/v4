import { z } from 'zod'
import { CitySelectObjectSchema } from './objects/CitySelect.schema'
import { CityIncludeObjectSchema } from './objects/CityInclude.schema'
import { CityUpdateInputObjectSchema } from './objects/CityUpdateInput.schema'
import { CityUncheckedUpdateInputObjectSchema } from './objects/CityUncheckedUpdateInput.schema'
import { CityWhereUniqueInputObjectSchema } from './objects/CityWhereUniqueInput.schema'

export const CityUpdateOneSchema = z.object({
  select: CitySelectObjectSchema.optional(),
  include: CityIncludeObjectSchema.optional(),
  data: z.union([
    CityUpdateInputObjectSchema,
    CityUncheckedUpdateInputObjectSchema,
  ]),
  where: CityWhereUniqueInputObjectSchema,
})
