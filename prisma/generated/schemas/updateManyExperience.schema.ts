import { z } from 'zod'
import { ExperienceUpdateManyMutationInputObjectSchema } from './objects/ExperienceUpdateManyMutationInput.schema'
import { ExperienceWhereInputObjectSchema } from './objects/ExperienceWhereInput.schema'

export const ExperienceUpdateManySchema = z.object({
  data: ExperienceUpdateManyMutationInputObjectSchema,
  where: ExperienceWhereInputObjectSchema.optional(),
})
