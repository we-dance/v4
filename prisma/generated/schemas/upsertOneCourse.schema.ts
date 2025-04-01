import { z } from 'zod'
import { CourseSelectObjectSchema } from './objects/CourseSelect.schema'
import { CourseIncludeObjectSchema } from './objects/CourseInclude.schema'
import { CourseWhereUniqueInputObjectSchema } from './objects/CourseWhereUniqueInput.schema'
import { CourseCreateInputObjectSchema } from './objects/CourseCreateInput.schema'
import { CourseUncheckedCreateInputObjectSchema } from './objects/CourseUncheckedCreateInput.schema'
import { CourseUpdateInputObjectSchema } from './objects/CourseUpdateInput.schema'
import { CourseUncheckedUpdateInputObjectSchema } from './objects/CourseUncheckedUpdateInput.schema'

export const CourseUpsertSchema = z.object({
  select: CourseSelectObjectSchema.optional(),
  include: CourseIncludeObjectSchema.optional(),
  where: CourseWhereUniqueInputObjectSchema,
  create: z.union([
    CourseCreateInputObjectSchema,
    CourseUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CourseUpdateInputObjectSchema,
    CourseUncheckedUpdateInputObjectSchema,
  ]),
})
