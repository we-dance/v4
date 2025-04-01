import { z } from 'zod'
import { CourseLessonSelectObjectSchema } from './objects/CourseLessonSelect.schema'
import { CourseLessonIncludeObjectSchema } from './objects/CourseLessonInclude.schema'
import { CourseLessonUpdateInputObjectSchema } from './objects/CourseLessonUpdateInput.schema'
import { CourseLessonUncheckedUpdateInputObjectSchema } from './objects/CourseLessonUncheckedUpdateInput.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './objects/CourseLessonWhereUniqueInput.schema'

export const CourseLessonUpdateOneSchema = z.object({
  select: CourseLessonSelectObjectSchema.optional(),
  include: CourseLessonIncludeObjectSchema.optional(),
  data: z.union([
    CourseLessonUpdateInputObjectSchema,
    CourseLessonUncheckedUpdateInputObjectSchema,
  ]),
  where: CourseLessonWhereUniqueInputObjectSchema,
})
