import { z } from 'zod'
import { VoteSelectObjectSchema } from './objects/VoteSelect.schema'
import { VoteIncludeObjectSchema } from './objects/VoteInclude.schema'
import { VoteWhereUniqueInputObjectSchema } from './objects/VoteWhereUniqueInput.schema'

export const VoteDeleteOneSchema = z.object({
  select: VoteSelectObjectSchema.optional(),
  include: VoteIncludeObjectSchema.optional(),
  where: VoteWhereUniqueInputObjectSchema,
})
