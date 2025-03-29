import { z } from 'zod'
import { EventSelectObjectSchema } from './objects/EventSelect.schema'
import { EventIncludeObjectSchema } from './objects/EventInclude.schema'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'
import { EventCreateInputObjectSchema } from './objects/EventCreateInput.schema'
import { EventUncheckedCreateInputObjectSchema } from './objects/EventUncheckedCreateInput.schema'
import { EventUpdateInputObjectSchema } from './objects/EventUpdateInput.schema'
import { EventUncheckedUpdateInputObjectSchema } from './objects/EventUncheckedUpdateInput.schema'

export const EventUpsertSchema = z.object({
  select: EventSelectObjectSchema.optional(),
  include: EventIncludeObjectSchema.optional(),
  where: EventWhereUniqueInputObjectSchema,
  create: z.union([
    EventCreateInputObjectSchema,
    EventUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    EventUpdateInputObjectSchema,
    EventUncheckedUpdateInputObjectSchema,
  ]),
})
