import { z } from 'zod'
import { GuestSelectObjectSchema } from './objects/GuestSelect.schema'
import { GuestIncludeObjectSchema } from './objects/GuestInclude.schema'
import { GuestCreateInputObjectSchema } from './objects/GuestCreateInput.schema'
import { GuestUncheckedCreateInputObjectSchema } from './objects/GuestUncheckedCreateInput.schema'

export const GuestCreateOneSchema = z.object({
  select: GuestSelectObjectSchema.optional(),
  include: GuestIncludeObjectSchema.optional(),
  data: z.union([
    GuestCreateInputObjectSchema,
    GuestUncheckedCreateInputObjectSchema,
  ]),
})
