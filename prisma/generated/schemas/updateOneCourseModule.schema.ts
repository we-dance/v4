import { z } from 'zod'
import { CourseModuleSelectObjectSchema } from './objects/CourseModuleSelect.schema'
import { CourseModuleIncludeObjectSchema } from './objects/CourseModuleInclude.schema'
import { CourseModuleUpdateInputObjectSchema } from './objects/CourseModuleUpdateInput.schema'
import { CourseModuleUncheckedUpdateInputObjectSchema } from './objects/CourseModuleUncheckedUpdateInput.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './objects/CourseModuleWhereUniqueInput.schema'

export const CourseModuleUpdateOneSchema = z.object({
  select: CourseModuleSelectObjectSchema.optional(),
  include: CourseModuleIncludeObjectSchema.optional(),
  data: z.union([
    CourseModuleUpdateInputObjectSchema,
    CourseModuleUncheckedUpdateInputObjectSchema,
  ]),
  where: CourseModuleWhereUniqueInputObjectSchema,
})
