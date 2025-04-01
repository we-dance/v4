import { z } from 'zod'
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema'
import { AccountIncludeObjectSchema } from './objects/AccountInclude.schema'
import { AccountCreateInputObjectSchema } from './objects/AccountCreateInput.schema'
import { AccountUncheckedCreateInputObjectSchema } from './objects/AccountUncheckedCreateInput.schema'

export const AccountCreateOneSchema = z.object({
  select: AccountSelectObjectSchema.optional(),
  include: AccountIncludeObjectSchema.optional(),
  data: z.union([
    AccountCreateInputObjectSchema,
    AccountUncheckedCreateInputObjectSchema,
  ]),
})
