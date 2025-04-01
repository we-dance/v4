import { z } from 'zod'
import { CitySubscriberSelectObjectSchema } from './objects/CitySubscriberSelect.schema'
import { CitySubscriberIncludeObjectSchema } from './objects/CitySubscriberInclude.schema'
import { CitySubscriberOrderByWithRelationInputObjectSchema } from './objects/CitySubscriberOrderByWithRelationInput.schema'
import { CitySubscriberWhereInputObjectSchema } from './objects/CitySubscriberWhereInput.schema'
import { CitySubscriberWhereUniqueInputObjectSchema } from './objects/CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberScalarFieldEnumSchema } from './enums/CitySubscriberScalarFieldEnum.schema'

export const CitySubscriberFindFirstSchema = z.object({
  select: CitySubscriberSelectObjectSchema.optional(),
  include: CitySubscriberIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      CitySubscriberOrderByWithRelationInputObjectSchema,
      CitySubscriberOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CitySubscriberWhereInputObjectSchema.optional(),
  cursor: CitySubscriberWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CitySubscriberScalarFieldEnumSchema).optional(),
})
