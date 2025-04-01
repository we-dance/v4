import { z } from 'zod'
import { OfferCreateManyInputObjectSchema } from './objects/OfferCreateManyInput.schema'

export const OfferCreateManySchema = z.object({
  data: z.union([
    OfferCreateManyInputObjectSchema,
    z.array(OfferCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
