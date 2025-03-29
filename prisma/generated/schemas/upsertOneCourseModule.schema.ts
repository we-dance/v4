import { z } from 'zod'
import { CourseModuleSelectObjectSchema } from './objects/CourseModuleSelect.schema'
import { CourseModuleIncludeObjectSchema } from './objects/CourseModuleInclude.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './objects/CourseModuleWhereUniqueInput.schema'
import { CourseModuleCreateInputObjectSchema } from './objects/CourseModuleCreateInput.schema'
import { CourseModuleUncheckedCreateInputObjectSchema } from './objects/CourseModuleUncheckedCreateInput.schema'
import { CourseModuleUpdateInputObjectSchema } from './objects/CourseModuleUpdateInput.schema'
import { CourseModuleUncheckedUpdateInputObjectSchema } from './objects/CourseModuleUncheckedUpdateInput.schema'

export const CourseModuleUpsertSchema = z.object({
  select: CourseModuleSelectObjectSchema.optional(),
  include: CourseModuleIncludeObjectSchema.optional(),
  where: CourseModuleWhereUniqueInputObjectSchema,
  create: z.union([
    CourseModuleCreateInputObjectSchema,
    CourseModuleUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CourseModuleUpdateInputObjectSchema,
    CourseModuleUncheckedUpdateInputObjectSchema,
  ]),
})
