import { z } from 'zod'
import { EventCreateManyInputObjectSchema } from './objects/EventCreateManyInput.schema'

export const EventCreateManySchema = z.object({
  data: z.union([
    EventCreateManyInputObjectSchema,
    z.array(EventCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
