import { z } from 'zod'
import { CourseLessonSelectObjectSchema } from './objects/CourseLessonSelect.schema'
import { CourseLessonIncludeObjectSchema } from './objects/CourseLessonInclude.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './objects/CourseLessonWhereUniqueInput.schema'

export const CourseLessonDeleteOneSchema = z.object({
  select: CourseLessonSelectObjectSchema.optional(),
  include: CourseLessonIncludeObjectSchema.optional(),
  where: CourseLessonWhereUniqueInputObjectSchema,
})
