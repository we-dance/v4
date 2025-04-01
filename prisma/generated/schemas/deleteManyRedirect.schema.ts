import { z } from 'zod'
import { RedirectWhereInputObjectSchema } from './objects/RedirectWhereInput.schema'

export const RedirectDeleteManySchema = z.object({
  where: RedirectWhereInputObjectSchema.optional(),
})
