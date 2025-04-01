import { z } from 'zod'
import { RedirectSelectObjectSchema } from './objects/RedirectSelect.schema'
import { RedirectWhereUniqueInputObjectSchema } from './objects/RedirectWhereUniqueInput.schema'

export const RedirectFindUniqueSchema = z.object({
  select: RedirectSelectObjectSchema.optional(),
  where: RedirectWhereUniqueInputObjectSchema,
})
