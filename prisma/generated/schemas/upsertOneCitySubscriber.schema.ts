import { z } from 'zod'
import { CitySubscriberSelectObjectSchema } from './objects/CitySubscriberSelect.schema'
import { CitySubscriberIncludeObjectSchema } from './objects/CitySubscriberInclude.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './objects/CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberCreateInputObjectSchema } from './objects/CitySubscriberCreateInput.schema'
import { CitySubscriberUncheckedCreateInputObjectSchema } from './objects/CitySubscriberUncheckedCreateInput.schema'
import { CitySubscriberUpdateInputObjectSchema } from './objects/CitySubscriberUpdateInput.schema'
import { CitySubscriberUncheckedUpdateInputObjectSchema } from './objects/CitySubscriberUncheckedUpdateInput.schema'

export const CitySubscriberUpsertSchema = z.object({
  select: CitySubscriberSelectObjectSchema.optional(),
  include: CitySubscriberIncludeObjectSchema.optional(),
  where: CitySubscriberWhereUniqueInputObjectSchema,
  create: z.union([
    CitySubscriberCreateInputObjectSchema,
    CitySubscriberUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CitySubscriberUpdateInputObjectSchema,
    CitySubscriberUncheckedUpdateInputObjectSchema,
  ]),
})
