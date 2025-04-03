import { z } from 'zod'
import { CityUpdateManyMutationInputObjectSchema } from './objects/CityUpdateManyMutationInput.schema'
import { CityWhereInputObjectSchema } from './objects/CityWhereInput.schema'

export const CityUpdateManySchema = z.object({
  data: CityUpdateManyMutationInputObjectSchema,
  where: CityWhereInputObjectSchema.optional(),
})
