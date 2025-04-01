import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './objects/CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './objects/CourseResourceInclude.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './objects/CourseResourceWhereUniqueInput.schema'

export const CourseResourceFindUniqueSchema = z.object({
  select: CourseResourceSelectObjectSchema.optional(),
  include: CourseResourceIncludeObjectSchema.optional(),
  where: CourseResourceWhereUniqueInputObjectSchema,
})
