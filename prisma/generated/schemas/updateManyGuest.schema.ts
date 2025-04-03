import { z } from 'zod'
import { GuestUpdateManyMutationInputObjectSchema } from './objects/GuestUpdateManyMutationInput.schema'
import { GuestWhereInputObjectSchema } from './objects/GuestWhereInput.schema'

export const GuestUpdateManySchema = z.object({
  data: GuestUpdateManyMutationInputObjectSchema,
  where: GuestWhereInputObjectSchema.optional(),
})
