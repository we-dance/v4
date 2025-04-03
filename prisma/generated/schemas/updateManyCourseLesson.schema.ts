import { z } from 'zod'
import { CourseLessonUpdateManyMutationInputObjectSchema } from './objects/CourseLessonUpdateManyMutationInput.schema'
import { CourseLessonWhereInputObjectSchema } from './objects/CourseLessonWhereInput.schema'

export const CourseLessonUpdateManySchema = z.object({
  data: CourseLessonUpdateManyMutationInputObjectSchema,
  where: CourseLessonWhereInputObjectSchema.optional(),
})
