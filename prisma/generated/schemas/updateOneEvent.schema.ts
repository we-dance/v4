import { z } from 'zod'
import { EventSelectObjectSchema } from './objects/EventSelect.schema'
import { EventIncludeObjectSchema } from './objects/EventInclude.schema'
import { EventUpdateInputObjectSchema } from './objects/EventUpdateInput.schema'
import { EventUncheckedUpdateInputObjectSchema } from './objects/EventUncheckedUpdateInput.schema'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'

export const EventUpdateOneSchema = z.object({
  select: EventSelectObjectSchema.optional(),
  include: EventIncludeObjectSchema.optional(),
  data: z.union([
    EventUpdateInputObjectSchema,
    EventUncheckedUpdateInputObjectSchema,
  ]),
  where: EventWhereUniqueInputObjectSchema,
})
