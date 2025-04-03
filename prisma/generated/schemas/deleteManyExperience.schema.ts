import { z } from 'zod'
import { ExperienceWhereInputObjectSchema } from './objects/ExperienceWhereInput.schema'

export const ExperienceDeleteManySchema = z.object({
  where: ExperienceWhereInputObjectSchema.optional(),
})
