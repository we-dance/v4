import { z } from 'zod'
import { CourseLessonSelectObjectSchema } from './objects/CourseLessonSelect.schema'
import { CourseLessonIncludeObjectSchema } from './objects/CourseLessonInclude.schema'
import { CourseLessonOrderByWithRelationInputObjectSchema } from './objects/CourseLessonOrderByWithRelationInput.schema'
import { CourseLessonWhereInputObjectSchema } from './objects/CourseLessonWhereInput.schema'
import { CourseLessonWhereUniqueInputObjectSchema } from './objects/CourseLessonWhereUniqueInput.schema'
import { CourseLessonScalarFieldEnumSchema } from './enums/CourseLessonScalarFieldEnum.schema'

export const CourseLessonFindManySchema = z.object({
  select: z.lazy(() => CourseLessonSelectObjectSchema.optional()),
  include: z.lazy(() => CourseLessonIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      CourseLessonOrderByWithRelationInputObjectSchema,
      CourseLessonOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CourseLessonWhereInputObjectSchema.optional(),
  cursor: CourseLessonWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CourseLessonScalarFieldEnumSchema).optional(),
})
