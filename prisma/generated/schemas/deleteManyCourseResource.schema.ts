import { z } from 'zod'
import { CourseResourceWhereInputObjectSchema } from './objects/CourseResourceWhereInput.schema'

export const CourseResourceDeleteManySchema = z.object({
  where: CourseResourceWhereInputObjectSchema.optional(),
})
