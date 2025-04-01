import { z } from 'zod'
import { VoteSelectObjectSchema } from './objects/VoteSelect.schema'
import { VoteIncludeObjectSchema } from './objects/VoteInclude.schema'
import { VoteUpdateInputObjectSchema } from './objects/VoteUpdateInput.schema'
import { VoteUncheckedUpdateInputObjectSchema } from './objects/VoteUncheckedUpdateInput.schema'
import { VoteWhereUniqueInputObjectSchema } from './objects/VoteWhereUniqueInput.schema'

export const VoteUpdateOneSchema = z.object({
  select: VoteSelectObjectSchema.optional(),
  include: VoteIncludeObjectSchema.optional(),
  data: z.union([
    VoteUpdateInputObjectSchema,
    VoteUncheckedUpdateInputObjectSchema,
  ]),
  where: VoteWhereUniqueInputObjectSchema,
})
