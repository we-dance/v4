import { z } from 'zod'
import { CountryWhereInputObjectSchema } from './objects/CountryWhereInput.schema'

export const CountryDeleteManySchema = z.object({
  where: CountryWhereInputObjectSchema.optional(),
})
