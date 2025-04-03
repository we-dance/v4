import { z } from 'zod'
import { CourseUpdateManyMutationInputObjectSchema } from './objects/CourseUpdateManyMutationInput.schema'
import { CourseWhereInputObjectSchema } from './objects/CourseWhereInput.schema'

export const CourseUpdateManySchema = z.object({
  data: CourseUpdateManyMutationInputObjectSchema,
  where: CourseWhereInputObjectSchema.optional(),
})
