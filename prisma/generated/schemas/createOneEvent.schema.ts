import { z } from 'zod'
import { EventSelectObjectSchema } from './objects/EventSelect.schema'
import { EventIncludeObjectSchema } from './objects/EventInclude.schema'
import { EventCreateInputObjectSchema } from './objects/EventCreateInput.schema'
import { EventUncheckedCreateInputObjectSchema } from './objects/EventUncheckedCreateInput.schema'

export const EventCreateOneSchema = z.object({
  select: EventSelectObjectSchema.optional(),
  include: EventIncludeObjectSchema.optional(),
  data: z.union([
    EventCreateInputObjectSchema,
    EventUncheckedCreateInputObjectSchema,
  ]),
})
