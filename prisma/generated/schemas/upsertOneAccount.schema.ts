import { z } from 'zod'
import { AccountSelectObjectSchema } from './objects/AccountSelect.schema'
import { AccountIncludeObjectSchema } from './objects/AccountInclude.schema'
import { AccountWhereUniqueInputObjectSchema } from './objects/AccountWhereUniqueInput.schema'
import { AccountCreateInputObjectSchema } from './objects/AccountCreateInput.schema'
import { AccountUncheckedCreateInputObjectSchema } from './objects/AccountUncheckedCreateInput.schema'
import { AccountUpdateInputObjectSchema } from './objects/AccountUpdateInput.schema'
import { AccountUncheckedUpdateInputObjectSchema } from './objects/AccountUncheckedUpdateInput.schema'

export const AccountUpsertSchema = z.object({
  select: AccountSelectObjectSchema.optional(),
  include: AccountIncludeObjectSchema.optional(),
  where: AccountWhereUniqueInputObjectSchema,
  create: z.union([
    AccountCreateInputObjectSchema,
    AccountUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    AccountUpdateInputObjectSchema,
    AccountUncheckedUpdateInputObjectSchema,
  ]),
})
