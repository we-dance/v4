import { z } from 'zod'
import { RedirectSelectObjectSchema } from './objects/RedirectSelect.schema'
import { RedirectOrderByWithRelationInputObjectSchema } from './objects/RedirectOrderByWithRelationInput.schema'
import { RedirectWhereInputObjectSchema } from './objects/RedirectWhereInput.schema'
import { RedirectWhereUniqueInputObjectSchema } from './objects/RedirectWhereUniqueInput.schema'
import { RedirectScalarFieldEnumSchema } from './enums/RedirectScalarFieldEnum.schema'

export const RedirectFindManySchema = z.object({
  select: z.lazy(() => RedirectSelectObjectSchema.optional()),
  orderBy: z
    .union([
      RedirectOrderByWithRelationInputObjectSchema,
      RedirectOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RedirectWhereInputObjectSchema.optional(),
  cursor: RedirectWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(RedirectScalarFieldEnumSchema).optional(),
})
