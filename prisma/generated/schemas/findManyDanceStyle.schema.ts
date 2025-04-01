import { z } from 'zod'
import { DanceStyleSelectObjectSchema } from './objects/DanceStyleSelect.schema'
import { DanceStyleIncludeObjectSchema } from './objects/DanceStyleInclude.schema'
import { DanceStyleOrderByWithRelationInputObjectSchema } from './objects/DanceStyleOrderByWithRelationInput.schema'
import { DanceStyleWhereInputObjectSchema } from './objects/DanceStyleWhereInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './objects/DanceStyleWhereUniqueInput.schema'
import { DanceStyleScalarFieldEnumSchema } from './enums/DanceStyleScalarFieldEnum.schema'

export const DanceStyleFindManySchema = z.object({
  select: z.lazy(() => DanceStyleSelectObjectSchema.optional()),
  include: z.lazy(() => DanceStyleIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      DanceStyleOrderByWithRelationInputObjectSchema,
      DanceStyleOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DanceStyleWhereInputObjectSchema.optional(),
  cursor: DanceStyleWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(DanceStyleScalarFieldEnumSchema).optional(),
})
