import { z } from 'zod'
import { CitySelectObjectSchema } from './objects/CitySelect.schema'
import { CityIncludeObjectSchema } from './objects/CityInclude.schema'
import { CityWhereUniqueInputObjectSchema } from './objects/CityWhereUniqueInput.schema'
import { CityCreateInputObjectSchema } from './objects/CityCreateInput.schema'
import { CityUncheckedCreateInputObjectSchema } from './objects/CityUncheckedCreateInput.schema'
import { CityUpdateInputObjectSchema } from './objects/CityUpdateInput.schema'
import { CityUncheckedUpdateInputObjectSchema } from './objects/CityUncheckedUpdateInput.schema'

export const CityUpsertSchema = z.object({
  select: CitySelectObjectSchema.optional(),
  include: CityIncludeObjectSchema.optional(),
  where: CityWhereUniqueInputObjectSchema,
  create: z.union([
    CityCreateInputObjectSchema,
    CityUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CityUpdateInputObjectSchema,
    CityUncheckedUpdateInputObjectSchema,
  ]),
})
