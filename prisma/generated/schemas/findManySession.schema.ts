import { z } from 'zod'
import { SessionSelectObjectSchema } from './objects/SessionSelect.schema'
import { SessionIncludeObjectSchema } from './objects/SessionInclude.schema'
import { SessionOrderByWithRelationInputObjectSchema } from './objects/SessionOrderByWithRelationInput.schema'
import { SessionWhereInputObjectSchema } from './objects/SessionWhereInput.schema'
import { SessionWhereUniqueInputObjectSchema } from './objects/SessionWhereUniqueInput.schema'
import { SessionScalarFieldEnumSchema } from './enums/SessionScalarFieldEnum.schema'

export const SessionFindManySchema = z.object({
  select: z.lazy(() => SessionSelectObjectSchema.optional()),
  include: z.lazy(() => SessionIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      SessionOrderByWithRelationInputObjectSchema,
      SessionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SessionWhereInputObjectSchema.optional(),
  cursor: SessionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(SessionScalarFieldEnumSchema).optional(),
})
