import { z } from 'zod'
import { ExperienceCreateManyInputObjectSchema } from './objects/ExperienceCreateManyInput.schema'

export const ExperienceCreateManySchema = z.object({
  data: z.union([
    ExperienceCreateManyInputObjectSchema,
    z.array(ExperienceCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
