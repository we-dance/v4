import { z } from 'zod'
import { CourseWhereInputObjectSchema } from './objects/CourseWhereInput.schema'

export const CourseDeleteManySchema = z.object({
  where: CourseWhereInputObjectSchema.optional(),
})
