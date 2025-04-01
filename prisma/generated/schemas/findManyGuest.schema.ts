import { z } from 'zod'
import { GuestSelectObjectSchema } from './objects/GuestSelect.schema'
import { GuestIncludeObjectSchema } from './objects/GuestInclude.schema'
import { GuestOrderByWithRelationInputObjectSchema } from './objects/GuestOrderByWithRelationInput.schema'
import { GuestWhereInputObjectSchema } from './objects/GuestWhereInput.schema'
import { GuestWhereUniqueInputObjectSchema } from './objects/GuestWhereUniqueInput.schema'
import { GuestScalarFieldEnumSchema } from './enums/GuestScalarFieldEnum.schema'

export const GuestFindManySchema = z.object({
  select: z.lazy(() => GuestSelectObjectSchema.optional()),
  include: z.lazy(() => GuestIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      GuestOrderByWithRelationInputObjectSchema,
      GuestOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: GuestWhereInputObjectSchema.optional(),
  cursor: GuestWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(GuestScalarFieldEnumSchema).optional(),
})
