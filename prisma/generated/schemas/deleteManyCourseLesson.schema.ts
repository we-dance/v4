import { z } from 'zod'
import { CourseLessonWhereInputObjectSchema } from './objects/CourseLessonWhereInput.schema'

export const CourseLessonDeleteManySchema = z.object({
  where: CourseLessonWhereInputObjectSchema.optional(),
})
