import { z } from 'zod'
import { CourseModuleSelectObjectSchema } from './objects/CourseModuleSelect.schema'
import { CourseModuleIncludeObjectSchema } from './objects/CourseModuleInclude.schema'
import { CourseModuleCreateInputObjectSchema } from './objects/CourseModuleCreateInput.schema'
import { CourseModuleUncheckedCreateInputObjectSchema } from './objects/CourseModuleUncheckedCreateInput.schema'

export const CourseModuleCreateOneSchema = z.object({
  select: CourseModuleSelectObjectSchema.optional(),
  include: CourseModuleIncludeObjectSchema.optional(),
  data: z.union([
    CourseModuleCreateInputObjectSchema,
    CourseModuleUncheckedCreateInputObjectSchema,
  ]),
})
