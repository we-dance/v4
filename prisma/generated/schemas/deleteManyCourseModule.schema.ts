import { z } from 'zod'
import { CourseModuleWhereInputObjectSchema } from './objects/CourseModuleWhereInput.schema'

export const CourseModuleDeleteManySchema = z.object({
  where: CourseModuleWhereInputObjectSchema.optional(),
})
