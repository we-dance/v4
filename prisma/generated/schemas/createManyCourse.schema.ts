import { z } from 'zod'
import { CourseCreateManyInputObjectSchema } from './objects/CourseCreateManyInput.schema'

export const CourseCreateManySchema = z.object({
  data: z.union([
    CourseCreateManyInputObjectSchema,
    z.array(CourseCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
