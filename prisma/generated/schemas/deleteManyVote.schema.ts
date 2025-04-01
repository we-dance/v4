import { z } from 'zod'
import { VoteWhereInputObjectSchema } from './objects/VoteWhereInput.schema'

export const VoteDeleteManySchema = z.object({
  where: VoteWhereInputObjectSchema.optional(),
})
