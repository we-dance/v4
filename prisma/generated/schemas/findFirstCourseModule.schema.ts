import { z } from 'zod'
import { CourseModuleSelectObjectSchema } from './objects/CourseModuleSelect.schema'
import { CourseModuleIncludeObjectSchema } from './objects/CourseModuleInclude.schema'
import { CourseModuleOrderByWithRelationInputObjectSchema } from './objects/CourseModuleOrderByWithRelationInput.schema'
import { CourseModuleWhereInputObjectSchema } from './objects/CourseModuleWhereInput.schema'
import { CourseModuleWhereUniqueInputObjectSchema } from './objects/CourseModuleWhereUniqueInput.schema'
import { CourseModuleScalarFieldEnumSchema } from './enums/CourseModuleScalarFieldEnum.schema'

export const CourseModuleFindFirstSchema = z.object({
  select: CourseModuleSelectObjectSchema.optional(),
  include: CourseModuleIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      CourseModuleOrderByWithRelationInputObjectSchema,
      CourseModuleOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseModuleWhereInputObjectSchema.optional(),
  cursor: CourseModuleWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CourseModuleScalarFieldEnumSchema).optional(),
})
