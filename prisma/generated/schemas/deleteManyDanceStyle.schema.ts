import { z } from 'zod'
import { DanceStyleWhereInputObjectSchema } from './objects/DanceStyleWhereInput.schema'

export const DanceStyleDeleteManySchema = z.object({
  where: DanceStyleWhereInputObjectSchema.optional(),
})
