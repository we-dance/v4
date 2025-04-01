import { z } from 'zod'
import { GuestWhereInputObjectSchema } from './objects/GuestWhereInput.schema'

export const GuestDeleteManySchema = z.object({
  where: GuestWhereInputObjectSchema.optional(),
})
