import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './objects/CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './objects/CourseResourceInclude.schema'
import { CourseResourceCreateInputObjectSchema } from './objects/CourseResourceCreateInput.schema'
import { CourseResourceUncheckedCreateInputObjectSchema } from './objects/CourseResourceUncheckedCreateInput.schema'

export const CourseResourceCreateOneSchema = z.object({
  select: CourseResourceSelectObjectSchema.optional(),
  include: CourseResourceIncludeObjectSchema.optional(),
  data: z.union([
    CourseResourceCreateInputObjectSchema,
    CourseResourceUncheckedCreateInputObjectSchema,
  ]),
})
