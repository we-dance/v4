import { z } from 'zod'
import { CourseCreateWithoutModulesInputObjectSchema } from './CourseCreateWithoutModulesInput.schema'
import { CourseUncheckedCreateWithoutModulesInputObjectSchema } from './CourseUncheckedCreateWithoutModulesInput.schema'
import { CourseCreateOrConnectWithoutModulesInputObjectSchema } from './CourseCreateOrConnectWithoutModulesInput.schema'
import { CourseUpsertWithoutModulesInputObjectSchema } from './CourseUpsertWithoutModulesInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseUpdateWithoutModulesInputObjectSchema } from './CourseUpdateWithoutModulesInput.schema'
import { CourseUncheckedUpdateWithoutModulesInputObjectSchema } from './CourseUncheckedUpdateWithoutModulesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutModulesNestedInput> =
  z
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
      upsert: z
        .lazy(() => CourseUpsertWithoutModulesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CourseWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CourseUpdateWithoutModulesInputObjectSchema),
          z.lazy(() => CourseUncheckedUpdateWithoutModulesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const CourseUpdateOneRequiredWithoutModulesNestedInputObjectSchema =
  Schema
