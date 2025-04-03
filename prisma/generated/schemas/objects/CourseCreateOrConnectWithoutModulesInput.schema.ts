import { z } from 'zod'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseCreateWithoutModulesInputObjectSchema } from './CourseCreateWithoutModulesInput.schema'
import { CourseUncheckedCreateWithoutModulesInputObjectSchema } from './CourseUncheckedCreateWithoutModulesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateOrConnectWithoutModulesInput> = z
  .object({
    where: z.lazy(() => CourseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CourseCreateWithoutModulesInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutModulesInputObjectSchema),
    ]),
  })
  .strict()

export const CourseCreateOrConnectWithoutModulesInputObjectSchema = Schema
