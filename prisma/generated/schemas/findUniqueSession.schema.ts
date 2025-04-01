import { z } from 'zod'
import { SessionSelectObjectSchema } from './objects/SessionSelect.schema'
import { SessionIncludeObjectSchema } from './objects/SessionInclude.schema'
import { SessionWhereUniqueInputObjectSchema } from './objects/SessionWhereUniqueInput.schema'

export const SessionFindUniqueSchema = z.object({
  select: SessionSelectObjectSchema.optional(),
  include: SessionIncludeObjectSchema.optional(),
  where: SessionWhereUniqueInputObjectSchema,
})
