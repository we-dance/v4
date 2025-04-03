import { z } from 'zod'
import { RedirectSelectObjectSchema } from './objects/RedirectSelect.schema'
import { RedirectCreateInputObjectSchema } from './objects/RedirectCreateInput.schema'
import { RedirectUncheckedCreateInputObjectSchema } from './objects/RedirectUncheckedCreateInput.schema'

export const RedirectCreateOneSchema = z.object({
  select: RedirectSelectObjectSchema.optional(),
  data: z.union([
    RedirectCreateInputObjectSchema,
    RedirectUncheckedCreateInputObjectSchema,
  ]),
})
