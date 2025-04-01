import { z } from 'zod'
import { CityCreateManyInputObjectSchema } from './objects/CityCreateManyInput.schema'

export const CityCreateManySchema = z.object({
  data: z.union([
    CityCreateManyInputObjectSchema,
    z.array(CityCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
