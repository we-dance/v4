import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './objects/CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './objects/CourseResourceInclude.schema'
import { CourseResourceUpdateInputObjectSchema } from './objects/CourseResourceUpdateInput.schema'
import { CourseResourceUncheckedUpdateInputObjectSchema } from './objects/CourseResourceUncheckedUpdateInput.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './objects/CourseResourceWhereUniqueInput.schema'

export const CourseResourceUpdateOneSchema = z.object({
  select: CourseResourceSelectObjectSchema.optional(),
  include: CourseResourceIncludeObjectSchema.optional(),
  data: z.union([
    CourseResourceUpdateInputObjectSchema,
    CourseResourceUncheckedUpdateInputObjectSchema,
  ]),
  where: CourseResourceWhereUniqueInputObjectSchema,
})
