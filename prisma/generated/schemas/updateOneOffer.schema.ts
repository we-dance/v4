import { z } from 'zod'
import { OfferSelectObjectSchema } from './objects/OfferSelect.schema'
import { OfferIncludeObjectSchema } from './objects/OfferInclude.schema'
import { OfferUpdateInputObjectSchema } from './objects/OfferUpdateInput.schema'
import { OfferUncheckedUpdateInputObjectSchema } from './objects/OfferUncheckedUpdateInput.schema'
import { OfferWhereUniqueInputObjectSchema } from './objects/OfferWhereUniqueInput.schema'

export const OfferUpdateOneSchema = z.object({
  select: OfferSelectObjectSchema.optional(),
  include: OfferIncludeObjectSchema.optional(),
  data: z.union([
    OfferUpdateInputObjectSchema,
    OfferUncheckedUpdateInputObjectSchema,
  ]),
  where: OfferWhereUniqueInputObjectSchema,
})
