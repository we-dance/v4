import { z } from 'zod'
import { CountryCreateManyInputObjectSchema } from './objects/CountryCreateManyInput.schema'

export const CountryCreateManySchema = z.object({
  data: z.union([
    CountryCreateManyInputObjectSchema,
    z.array(CountryCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
