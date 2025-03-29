import { z } from 'zod'
import { CourseModuleSelectObjectSchema } from './objects/CourseModuleSelect.schema'
import { CourseModuleIncludeObjectSchema } from './objects/CourseModuleInclude.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './objects/CourseModuleWhereUniqueInput.schema'

export const CourseModuleFindUniqueSchema = z.object({
  select: CourseModuleSelectObjectSchema.optional(),
  include: CourseModuleIncludeObjectSchema.optional(),
  where: CourseModuleWhereUniqueInputObjectSchema,
})
