import { z } from 'zod'
import { CourseSelectObjectSchema } from './objects/CourseSelect.schema'
import { CourseIncludeObjectSchema } from './objects/CourseInclude.schema'
import { CourseOrderByWithRelationInputObjectSchema } from './objects/CourseOrderByWithRelationInput.schema'
import { CourseWhereInputObjectSchema } from './objects/CourseWhereInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './objects/CourseWhereUniqueInput.schema'
import { CourseScalarFieldEnumSchema } from './enums/CourseScalarFieldEnum.schema'

export const CourseFindManySchema = z.object({
  select: z.lazy(() => CourseSelectObjectSchema.optional()),
  include: z.lazy(() => CourseIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      CourseOrderByWithRelationInputObjectSchema,
      CourseOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseWhereInputObjectSchema.optional(),
  cursor: CourseWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CourseScalarFieldEnumSchema).optional(),
})
