import { z } from 'zod'
import { EventUpdateManyMutationInputObjectSchema } from './objects/EventUpdateManyMutationInput.schema'
import { EventWhereInputObjectSchema } from './objects/EventWhereInput.schema'

export const EventUpdateManySchema = z.object({
  data: EventUpdateManyMutationInputObjectSchema,
  where: EventWhereInputObjectSchema.optional(),
})
