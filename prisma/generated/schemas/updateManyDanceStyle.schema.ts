import { z } from 'zod'
import { DanceStyleUpdateManyMutationInputObjectSchema } from './objects/DanceStyleUpdateManyMutationInput.schema'
import { DanceStyleWhereInputObjectSchema } from './objects/DanceStyleWhereInput.schema'

export const DanceStyleUpdateManySchema = z.object({
  data: DanceStyleUpdateManyMutationInputObjectSchema,
  where: DanceStyleWhereInputObjectSchema.optional(),
})
