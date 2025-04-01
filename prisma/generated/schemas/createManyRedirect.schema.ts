import { z } from 'zod'
import { RedirectCreateManyInputObjectSchema } from './objects/RedirectCreateManyInput.schema'

export const RedirectCreateManySchema = z.object({
  data: z.union([
    RedirectCreateManyInputObjectSchema,
    z.array(RedirectCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
