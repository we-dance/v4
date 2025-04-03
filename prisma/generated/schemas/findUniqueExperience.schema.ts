import { z } from 'zod'
import { ExperienceSelectObjectSchema } from './objects/ExperienceSelect.schema'
import { ExperienceIncludeObjectSchema } from './objects/ExperienceInclude.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './objects/ExperienceWhereUniqueInput.schema'

export const ExperienceFindUniqueSchema = z.object({
  select: ExperienceSelectObjectSchema.optional(),
  include: ExperienceIncludeObjectSchema.optional(),
  where: ExperienceWhereUniqueInputObjectSchema,
})
