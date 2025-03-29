import { z } from 'zod'
import { CourseSelectObjectSchema } from './objects/CourseSelect.schema'
import { CourseIncludeObjectSchema } from './objects/CourseInclude.schema'
import { CourseUpdateInputObjectSchema } from './objects/CourseUpdateInput.schema'
import { CourseUncheckedUpdateInputObjectSchema } from './objects/CourseUncheckedUpdateInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './objects/CourseWhereUniqueInput.schema'

export const CourseUpdateOneSchema = z.object({
  select: CourseSelectObjectSchema.optional(),
  include: CourseIncludeObjectSchema.optional(),
  data: z.union([
    CourseUpdateInputObjectSchema,
    CourseUncheckedUpdateInputObjectSchema,
  ]),
  where: CourseWhereUniqueInputObjectSchema,
})
