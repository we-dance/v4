import { z } from 'zod'
import { ExperienceSelectObjectSchema } from './objects/ExperienceSelect.schema'
import { ExperienceIncludeObjectSchema } from './objects/ExperienceInclude.schema'
import { ExperienceCreateInputObjectSchema } from './objects/ExperienceCreateInput.schema'
import { ExperienceUncheckedCreateInputObjectSchema } from './objects/ExperienceUncheckedCreateInput.schema'

export const ExperienceCreateOneSchema = z.object({
  select: ExperienceSelectObjectSchema.optional(),
  include: ExperienceIncludeObjectSchema.optional(),
  data: z.union([
    ExperienceCreateInputObjectSchema,
    ExperienceUncheckedCreateInputObjectSchema,
  ]),
})
