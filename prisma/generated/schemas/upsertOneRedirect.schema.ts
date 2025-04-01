import { z } from 'zod'
import { RedirectSelectObjectSchema } from './objects/RedirectSelect.schema'
import { RedirectWhereUniqueInputObjectSchema } from './objects/RedirectWhereUniqueInput.schema'
import { RedirectCreateInputObjectSchema } from './objects/RedirectCreateInput.schema'
import { RedirectUncheckedCreateInputObjectSchema } from './objects/RedirectUncheckedCreateInput.schema'
import { RedirectUpdateInputObjectSchema } from './objects/RedirectUpdateInput.schema'
import { RedirectUncheckedUpdateInputObjectSchema } from './objects/RedirectUncheckedUpdateInput.schema'

export const RedirectUpsertSchema = z.object({
  select: RedirectSelectObjectSchema.optional(),
  where: RedirectWhereUniqueInputObjectSchema,
  create: z.union([
    RedirectCreateInputObjectSchema,
    RedirectUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    RedirectUpdateInputObjectSchema,
    RedirectUncheckedUpdateInputObjectSchema,
  ]),
})
