import { z } from 'zod'
import { CourseModuleCreateManyInputObjectSchema } from './objects/CourseModuleCreateManyInput.schema'

export const CourseModuleCreateManySchema = z.object({
  data: z.union([
    CourseModuleCreateManyInputObjectSchema,
    z.array(CourseModuleCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
