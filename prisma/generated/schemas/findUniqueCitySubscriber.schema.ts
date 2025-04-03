import { z } from 'zod'
import { CitySubscriberSelectObjectSchema } from './objects/CitySubscriberSelect.schema'
import { CitySubscriberIncludeObjectSchema } from './objects/CitySubscriberInclude.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './objects/CitySubscriberWhereUniqueInput.schema'

export const CitySubscriberFindUniqueSchema = z.object({
  select: CitySubscriberSelectObjectSchema.optional(),
  include: CitySubscriberIncludeObjectSchema.optional(),
  where: CitySubscriberWhereUniqueInputObjectSchema,
})
