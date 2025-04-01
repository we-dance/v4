import { z } from 'zod'
import { GuestSelectObjectSchema } from './objects/GuestSelect.schema'
import { GuestIncludeObjectSchema } from './objects/GuestInclude.schema'
import { GuestUpdateInputObjectSchema } from './objects/GuestUpdateInput.schema'
import { GuestUncheckedUpdateInputObjectSchema } from './objects/GuestUncheckedUpdateInput.schema'
import { GuestWhereUniqueInputObjectSchema } from './objects/GuestWhereUniqueInput.schema'

export const GuestUpdateOneSchema = z.object({
  select: GuestSelectObjectSchema.optional(),
  include: GuestIncludeObjectSchema.optional(),
  data: z.union([
    GuestUpdateInputObjectSchema,
    GuestUncheckedUpdateInputObjectSchema,
  ]),
  where: GuestWhereUniqueInputObjectSchema,
})
