import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './objects/CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './objects/CourseResourceInclude.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './objects/CourseResourceWhereUniqueInput.schema'

export const CourseResourceDeleteOneSchema = z.object({
  select: CourseResourceSelectObjectSchema.optional(),
  include: CourseResourceIncludeObjectSchema.optional(),
  where: CourseResourceWhereUniqueInputObjectSchema,
})
