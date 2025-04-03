import { z } from 'zod'
import { CourseModuleUpdateManyMutationInputObjectSchema } from './objects/CourseModuleUpdateManyMutationInput.schema'
import { CourseModuleWhereInputObjectSchema } from './objects/CourseModuleWhereInput.schema'

export const CourseModuleUpdateManySchema = z.object({
  data: CourseModuleUpdateManyMutationInputObjectSchema,
  where: CourseModuleWhereInputObjectSchema.optional(),
})
