import { z } from 'zod'
import { CourseResourceCreateManyInputObjectSchema } from './objects/CourseResourceCreateManyInput.schema'

export const CourseResourceCreateManySchema = z.object({
  data: z.union([
    CourseResourceCreateManyInputObjectSchema,
    z.array(CourseResourceCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
