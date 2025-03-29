import { z } from 'zod'
import { EventSelectObjectSchema } from './objects/EventSelect.schema'
import { EventIncludeObjectSchema } from './objects/EventInclude.schema'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'

export const EventDeleteOneSchema = z.object({
  select: EventSelectObjectSchema.optional(),
  include: EventIncludeObjectSchema.optional(),
  where: EventWhereUniqueInputObjectSchema,
})
