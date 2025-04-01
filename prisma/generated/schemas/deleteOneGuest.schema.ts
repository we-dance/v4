import { z } from 'zod'
import { GuestSelectObjectSchema } from './objects/GuestSelect.schema'
import { GuestIncludeObjectSchema } from './objects/GuestInclude.schema'
import { GuestWhereUniqueInputObjectSchema } from './objects/GuestWhereUniqueInput.schema'

export const GuestDeleteOneSchema = z.object({
  select: GuestSelectObjectSchema.optional(),
  include: GuestIncludeObjectSchema.optional(),
  where: GuestWhereUniqueInputObjectSchema,
})
