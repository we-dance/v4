import { z } from 'zod'
import { RedirectSelectObjectSchema } from './objects/RedirectSelect.schema'
import { RedirectUpdateInputObjectSchema } from './objects/RedirectUpdateInput.schema'
import { RedirectUncheckedUpdateInputObjectSchema } from './objects/RedirectUncheckedUpdateInput.schema'
import { RedirectWhereUniqueInputObjectSchema } from './objects/RedirectWhereUniqueInput.schema'

export const RedirectUpdateOneSchema = z.object({
  select: RedirectSelectObjectSchema.optional(),
  data: z.union([
    RedirectUpdateInputObjectSchema,
    RedirectUncheckedUpdateInputObjectSchema,
  ]),
  where: RedirectWhereUniqueInputObjectSchema,
})
