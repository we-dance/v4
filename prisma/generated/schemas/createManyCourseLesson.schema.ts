import { z } from 'zod'
import { CourseLessonCreateManyInputObjectSchema } from './objects/CourseLessonCreateManyInput.schema'

export const CourseLessonCreateManySchema = z.object({
  data: z.union([
    CourseLessonCreateManyInputObjectSchema,
    z.array(CourseLessonCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
