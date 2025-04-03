import { z } from 'zod'
import { EventWhereInputObjectSchema } from './objects/EventWhereInput.schema'

export const EventDeleteManySchema = z.object({
  where: EventWhereInputObjectSchema.optional(),
})
