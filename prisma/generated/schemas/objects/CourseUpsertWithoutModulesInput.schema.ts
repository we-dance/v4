import { z } from 'zod'
import { CourseUpdateWithoutModulesInputObjectSchema } from './CourseUpdateWithoutModulesInput.schema'
import { CourseUncheckedUpdateWithoutModulesInputObjectSchema } from './CourseUncheckedUpdateWithoutModulesInput.schema'
import { CourseCreateWithoutModulesInputObjectSchema } from './CourseCreateWithoutModulesInput.schema'
import { CourseUncheckedCreateWithoutModulesInputObjectSchema } from './CourseUncheckedCreateWithoutModulesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpsertWithoutModulesInput> = z
  .object({
    update: z.union([
      z.lazy(() => CourseUpdateWithoutModulesInputObjectSchema),
      z.lazy(() => CourseUncheckedUpdateWithoutModulesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CourseCreateWithoutModulesInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutModulesInputObjectSchema),
    ]),
  })
  .strict()

export const CourseUpsertWithoutModulesInputObjectSchema = Schema
