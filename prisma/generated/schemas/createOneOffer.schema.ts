import { z } from 'zod'
import { OfferSelectObjectSchema } from './objects/OfferSelect.schema'
import { OfferIncludeObjectSchema } from './objects/OfferInclude.schema'
import { OfferCreateInputObjectSchema } from './objects/OfferCreateInput.schema'
import { OfferUncheckedCreateInputObjectSchema } from './objects/OfferUncheckedCreateInput.schema'

export const OfferCreateOneSchema = z.object({
  select: OfferSelectObjectSchema.optional(),
  include: OfferIncludeObjectSchema.optional(),
  data: z.union([
    OfferCreateInputObjectSchema,
    OfferUncheckedCreateInputObjectSchema,
  ]),
})
