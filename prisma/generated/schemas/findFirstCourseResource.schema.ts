import { z } from 'zod'
import { CourseResourceSelectObjectSchema } from './objects/CourseResourceSelect.schema'
import { CourseResourceIncludeObjectSchema } from './objects/CourseResourceInclude.schema'
import { CourseResourceOrderByWithRelationInputObjectSchema } from './objects/CourseResourceOrderByWithRelationInput.schema'
import { CourseResourceWhereInputObjectSchema } from './objects/CourseResourceWhereInput.schema'
import { CourseResourceWhereUniqueInputObjectSchema } from './objects/CourseResourceWhereUniqueInput.schema'
import { CourseResourceScalarFieldEnumSchema } from './enums/CourseResourceScalarFieldEnum.schema'

export const CourseResourceFindFirstSchema = z.object({
  select: CourseResourceSelectObjectSchema.optional(),
  include: CourseResourceIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      CourseResourceOrderByWithRelationInputObjectSchema,
      CourseResourceOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseResourceWhereInputObjectSchema.optional(),
  cursor: CourseResourceWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CourseResourceScalarFieldEnumSchema).optional(),
})
