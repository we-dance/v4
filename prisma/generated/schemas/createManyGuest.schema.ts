import { z } from 'zod'
import { GuestCreateManyInputObjectSchema } from './objects/GuestCreateManyInput.schema'

export const GuestCreateManySchema = z.object({
  data: z.union([
    GuestCreateManyInputObjectSchema,
    z.array(GuestCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
