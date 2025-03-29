import { z } from 'zod'
import { VoteUpdateManyMutationInputObjectSchema } from './objects/VoteUpdateManyMutationInput.schema'
import { VoteWhereInputObjectSchema } from './objects/VoteWhereInput.schema'

export const VoteUpdateManySchema = z.object({
  data: VoteUpdateManyMutationInputObjectSchema,
  where: VoteWhereInputObjectSchema.optional(),
})
