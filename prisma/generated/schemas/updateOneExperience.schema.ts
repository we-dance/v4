import { z } from 'zod'
import { ExperienceSelectObjectSchema } from './objects/ExperienceSelect.schema'
import { ExperienceIncludeObjectSchema } from './objects/ExperienceInclude.schema'
import { ExperienceUpdateInputObjectSchema } from './objects/ExperienceUpdateInput.schema'
import { ExperienceUncheckedUpdateInputObjectSchema } from './objects/ExperienceUncheckedUpdateInput.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './objects/ExperienceWhereUniqueInput.schema'

export const ExperienceUpdateOneSchema = z.object({
  select: ExperienceSelectObjectSchema.optional(),
  include: ExperienceIncludeObjectSchema.optional(),
  data: z.union([
    ExperienceUpdateInputObjectSchema,
    ExperienceUncheckedUpdateInputObjectSchema,
  ]),
  where: ExperienceWhereUniqueInputObjectSchema,
})
