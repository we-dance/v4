import { z } from 'zod'
import { CourseSelectObjectSchema } from './objects/CourseSelect.schema'
import { CourseIncludeObjectSchema } from './objects/CourseInclude.schema'
import { CourseCreateInputObjectSchema } from './objects/CourseCreateInput.schema'
import { CourseUncheckedCreateInputObjectSchema } from './objects/CourseUncheckedCreateInput.schema'

export const CourseCreateOneSchema = z.object({
  select: CourseSelectObjectSchema.optional(),
  include: CourseIncludeObjectSchema.optional(),
  data: z.union([
    CourseCreateInputObjectSchema,
    CourseUncheckedCreateInputObjectSchema,
  ]),
})
