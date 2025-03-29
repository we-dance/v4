import { z } from 'zod'
import { CountryUpdateManyMutationInputObjectSchema } from './objects/CountryUpdateManyMutationInput.schema'
import { CountryWhereInputObjectSchema } from './objects/CountryWhereInput.schema'

export const CountryUpdateManySchema = z.object({
  data: CountryUpdateManyMutationInputObjectSchema,
  where: CountryWhereInputObjectSchema.optional(),
})
