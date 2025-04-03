import { z } from 'zod'
import { CityWhereInputObjectSchema } from './objects/CityWhereInput.schema'

export const CityDeleteManySchema = z.object({
  where: CityWhereInputObjectSchema.optional(),
})
