import { z } from 'zod'
import { CourseCreateWithoutModulesInputObjectSchema } from './CourseCreateWithoutModulesInput.schema'
import { CourseUncheckedCreateWithoutModulesInputObjectSchema } from './CourseUncheckedCreateWithoutModulesInput.schema'
import { CourseCreateOrConnectWithoutModulesInputObjectSchema } from './CourseCreateOrConnectWithoutModulesInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateNestedOneWithoutModulesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CourseCreateWithoutModulesInputObjectSchema),
        z.lazy(() => CourseUncheckedCreateWithoutModulesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CourseCreateOrConnectWithoutModulesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => CourseWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const CourseCreateNestedOneWithoutModulesInputObjectSchema = Schema
