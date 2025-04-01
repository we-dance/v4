import { z } from 'zod'
import { CourseLessonSelectObjectSchema } from './objects/CourseLessonSelect.schema'
import { CourseLessonIncludeObjectSchema } from './objects/CourseLessonInclude.schema'
import { CourseLessonCreateInputObjectSchema } from './objects/CourseLessonCreateInput.schema'
import { CourseLessonUncheckedCreateInputObjectSchema } from './objects/CourseLessonUncheckedCreateInput.schema'

export const CourseLessonCreateOneSchema = z.object({
  select: CourseLessonSelectObjectSchema.optional(),
  include: CourseLessonIncludeObjectSchema.optional(),
  data: z.union([
    CourseLessonCreateInputObjectSchema,
    CourseLessonUncheckedCreateInputObjectSchema,
  ]),
})
