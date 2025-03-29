import { z } from 'zod'
import { CitySubscriberUpdateManyMutationInputObjectSchema } from './objects/CitySubscriberUpdateManyMutationInput.schema'
import { CitySubscriberWhereInputObjectSchema } from './objects/CitySubscriberWhereInput.schema'

export const CitySubscriberUpdateManySchema = z.object({
  data: CitySubscriberUpdateManyMutationInputObjectSchema,
  where: CitySubscriberWhereInputObjectSchema.optional(),
})
