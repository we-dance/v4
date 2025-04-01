import { z } from 'zod'
import { CourseSelectObjectSchema } from './objects/CourseSelect.schema'
import { CourseIncludeObjectSchema } from './objects/CourseInclude.schema'
import { CourseWhereUniqueInputObjectSchema } from './objects/CourseWhereUniqueInput.schema'

export const CourseDeleteOneSchema = z.object({
  select: CourseSelectObjectSchema.optional(),
  include: CourseIncludeObjectSchema.optional(),
  where: CourseWhereUniqueInputObjectSchema,
})
