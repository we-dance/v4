import { z } from 'zod'
import { CourseModuleScalarWhereInputObjectSchema } from './CourseModuleScalarWhereInput.schema'
import { CourseModuleUpdateManyMutationInputObjectSchema } from './CourseModuleUpdateManyMutationInput.schema'
import { CourseModuleUncheckedUpdateManyWithoutModulesInputObjectSchema } from './CourseModuleUncheckedUpdateManyWithoutModulesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseModuleUpdateManyWithWhereWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseModuleScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseModuleUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CourseModuleUncheckedUpdateManyWithoutModulesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseModuleUpdateManyWithWhereWithoutCourseInputObjectSchema =
  Schema
