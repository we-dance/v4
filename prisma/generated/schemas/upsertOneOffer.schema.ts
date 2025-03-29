import { z } from 'zod'
import { OfferSelectObjectSchema } from './objects/OfferSelect.schema'
import { OfferIncludeObjectSchema } from './objects/OfferInclude.schema'
import { OfferWhereUniqueInputObjectSchema } from './objects/OfferWhereUniqueInput.schema'
import { OfferCreateInputObjectSchema } from './objects/OfferCreateInput.schema'
import { OfferUncheckedCreateInputObjectSchema } from './objects/OfferUncheckedCreateInput.schema'
import { OfferUpdateInputObjectSchema } from './objects/OfferUpdateInput.schema'
import { OfferUncheckedUpdateInputObjectSchema } from './objects/OfferUncheckedUpdateInput.schema'

export const OfferUpsertSchema = z.object({
  select: OfferSelectObjectSchema.optional(),
  include: OfferIncludeObjectSchema.optional(),
  where: OfferWhereUniqueInputObjectSchema,
  create: z.union([
    OfferCreateInputObjectSchema,
    OfferUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    OfferUpdateInputObjectSchema,
    OfferUncheckedUpdateInputObjectSchema,
  ]),
})
