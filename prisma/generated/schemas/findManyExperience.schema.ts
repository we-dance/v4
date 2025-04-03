import { z } from 'zod'
import { ExperienceSelectObjectSchema } from './objects/ExperienceSelect.schema'
import { ExperienceIncludeObjectSchema } from './objects/ExperienceInclude.schema'
import { ExperienceOrderByWithRelationInputObjectSchema } from './objects/ExperienceOrderByWithRelationInput.schema'
import { ExperienceWhereInputObjectSchema } from './objects/ExperienceWhereInput.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './objects/ExperienceWhereUniqueInput.schema'
import { ExperienceScalarFieldEnumSchema } from './enums/ExperienceScalarFieldEnum.schema'

export const ExperienceFindManySchema = z.object({
  select: z.lazy(() => ExperienceSelectObjectSchema.optional()),
  include: z.lazy(() => ExperienceIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      ExperienceOrderByWithRelationInputObjectSchema,
      ExperienceOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ExperienceWhereInputObjectSchema.optional(),
  cursor: ExperienceWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ExperienceScalarFieldEnumSchema).optional(),
})
