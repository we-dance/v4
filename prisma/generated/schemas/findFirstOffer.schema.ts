import { z } from 'zod'
import { OfferSelectObjectSchema } from './objects/OfferSelect.schema'
import { OfferIncludeObjectSchema } from './objects/OfferInclude.schema'
import { OfferOrderByWithRelationInputObjectSchema } from './objects/OfferOrderByWithRelationInput.schema'
import { OfferWhereInputObjectSchema } from './objects/OfferWhereInput.schema'
import { OfferWhereUniqueInputObjectSchema } from './objects/OfferWhereUniqueInput.schema'
import { OfferScalarFieldEnumSchema } from './enums/OfferScalarFieldEnum.schema'

export const OfferFindFirstSchema = z.object({
  select: OfferSelectObjectSchema.optional(),
  include: OfferIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      OfferOrderByWithRelationInputObjectSchema,
      OfferOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: OfferWhereInputObjectSchema.optional(),
  cursor: OfferWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(OfferScalarFieldEnumSchema).optional(),
})
