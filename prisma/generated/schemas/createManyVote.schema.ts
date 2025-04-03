import { z } from 'zod'
import { VoteCreateManyInputObjectSchema } from './objects/VoteCreateManyInput.schema'

export const VoteCreateManySchema = z.object({
  data: z.union([
    VoteCreateManyInputObjectSchema,
    z.array(VoteCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
