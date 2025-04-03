import { z } from 'zod'
import { RedirectUpdateManyMutationInputObjectSchema } from './objects/RedirectUpdateManyMutationInput.schema'
import { RedirectWhereInputObjectSchema } from './objects/RedirectWhereInput.schema'

export const RedirectUpdateManySchema = z.object({
  data: RedirectUpdateManyMutationInputObjectSchema,
  where: RedirectWhereInputObjectSchema.optional(),
})
