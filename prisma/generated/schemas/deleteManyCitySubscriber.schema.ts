import { z } from 'zod'
import { CitySubscriberWhereInputObjectSchema } from './objects/CitySubscriberWhereInput.schema'

export const CitySubscriberDeleteManySchema = z.object({
  where: CitySubscriberWhereInputObjectSchema.optional(),
})
