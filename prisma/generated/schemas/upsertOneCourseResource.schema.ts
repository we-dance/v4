import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './objects/CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './objects/CourseResourceInclude.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './objects/CourseResourceWhereUniqueInput.schema'
import { CourseResourceCreateInputObjectSchema } from './objects/CourseResourceCreateInput.schema'
import { CourseResourceUncheckedCreateInputObjectSchema } from './objects/CourseResourceUncheckedCreateInput.schema'
import { CourseResourceUpdateInputObjectSchema } from './objects/CourseResourceUpdateInput.schema'
import { CourseResourceUncheckedUpdateInputObjectSchema } from './objects/CourseResourceUncheckedUpdateInput.schema'

export const CourseResourceUpsertSchema = z.object({
  select: CourseResourceSelectObjectSchema.optional(),
  include: CourseResourceIncludeObjectSchema.optional(),
  where: CourseResourceWhereUniqueInputObjectSchema,
  create: z.union([
    CourseResourceCreateInputObjectSchema,
    CourseResourceUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CourseResourceUpdateInputObjectSchema,
    CourseResourceUncheckedUpdateInputObjectSchema,
  ]),
})
