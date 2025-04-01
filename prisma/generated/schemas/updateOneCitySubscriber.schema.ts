import { z } from 'zod'
import { CitySubscriberSelectObjectSchema } from './objects/CitySubscriberSelect.schema'
import { CitySubscriberIncludeObjectSchema } from './objects/CitySubscriberInclude.schema'
import { CitySubscriberUpdateInputObjectSchema } from './objects/CitySubscriberUpdateInput.schema'
import { CitySubscriberUncheckedUpdateInputObjectSchema } from './objects/CitySubscriberUncheckedUpdateInput.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './objects/CitySubscriberWhereUniqueInput.schema'

export const CitySubscriberUpdateOneSchema = z.object({
  select: CitySubscriberSelectObjectSchema.optional(),
  include: CitySubscriberIncludeObjectSchema.optional(),
  data: z.union([
    CitySubscriberUpdateInputObjectSchema,
    CitySubscriberUncheckedUpdateInputObjectSchema,
  ]),
  where: CitySubscriberWhereUniqueInputObjectSchema,
})
