import { z } from 'zod'
import { CitySubscriberCreateManyInputObjectSchema } from './objects/CitySubscriberCreateManyInput.schema'

export const CitySubscriberCreateManySchema = z.object({
  data: z.union([
    CitySubscriberCreateManyInputObjectSchema,
    z.array(CitySubscriberCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
