import { z } from 'zod'
import { OfferSelectObjectSchema } from './objects/OfferSelect.schema'
import { OfferIncludeObjectSchema } from './objects/OfferInclude.schema'
import { OfferWhereUniqueInputObjectSchema } from './objects/OfferWhereUniqueInput.schema'

export const OfferDeleteOneSchema = z.object({
  select: OfferSelectObjectSchema.optional(),
  include: OfferIncludeObjectSchema.optional(),
  where: OfferWhereUniqueInputObjectSchema,
})
