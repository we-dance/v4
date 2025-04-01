import { z } from 'zod'
import { CourseResourceUpdateManyMutationInputObjectSchema } from './objects/CourseResourceUpdateManyMutationInput.schema'
import { CourseResourceWhereInputObjectSchema } from './objects/CourseResourceWhereInput.schema'

export const CourseResourceUpdateManySchema = z.object({
  data: CourseResourceUpdateManyMutationInputObjectSchema,
  where: CourseResourceWhereInputObjectSchema.optional(),
})
