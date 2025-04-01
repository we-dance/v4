import { z } from 'zod'
import { CourseLessonSelectObjectSchema } from './objects/CourseLessonSelect.schema'
import { CourseLessonIncludeObjectSchema } from './objects/CourseLessonInclude.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './objects/CourseLessonWhereUniqueInput.schema'
import { CourseLessonCreateInputObjectSchema } from './objects/CourseLessonCreateInput.schema'
import { CourseLessonUncheckedCreateInputObjectSchema } from './objects/CourseLessonUncheckedCreateInput.schema'
import { CourseLessonUpdateInputObjectSchema } from './objects/CourseLessonUpdateInput.schema'
import { CourseLessonUncheckedUpdateInputObjectSchema } from './objects/CourseLessonUncheckedUpdateInput.schema'

export const CourseLessonUpsertSchema = z.object({
  select: CourseLessonSelectObjectSchema.optional(),
  include: CourseLessonIncludeObjectSchema.optional(),
  where: CourseLessonWhereUniqueInputObjectSchema,
  create: z.union([
    CourseLessonCreateInputObjectSchema,
    CourseLessonUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CourseLessonUpdateInputObjectSchema,
    CourseLessonUncheckedUpdateInputObjectSchema,
  ]),
})
