import { z } from 'zod'
import { CitySubscriberSelectObjectSchema } from './objects/CitySubscriberSelect.schema'
import { CitySubscriberIncludeObjectSchema } from './objects/CitySubscriberInclude.schema'
import { CitySubscriberCreateInputObjectSchema } from './objects/CitySubscriberCreateInput.schema'
import { CitySubscriberUncheckedCreateInputObjectSchema } from './objects/CitySubscriberUncheckedCreateInput.schema'

export const CitySubscriberCreateOneSchema = z.object({
  select: CitySubscriberSelectObjectSchema.optional(),
  include: CitySubscriberIncludeObjectSchema.optional(),
  data: z.union([
    CitySubscriberCreateInputObjectSchema,
    CitySubscriberUncheckedCreateInputObjectSchema,
  ]),
})
