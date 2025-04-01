import { z } from 'zod'
import { CourseCreateWithoutResourcesInputObjectSchema } from './CourseCreateWithoutResourcesInput.schema'
import { CourseUncheckedCreateWithoutResourcesInputObjectSchema } from './CourseUncheckedCreateWithoutResourcesInput.schema'
import { CourseCreateOrConnectWithoutResourcesInputObjectSchema } from './CourseCreateOrConnectWithoutResourcesInput.schema'
import { CourseUpsertWithoutResourcesInputObjectSchema } from './CourseUpsertWithoutResourcesInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseUpdateWithoutResourcesInputObjectSchema } from './CourseUpdateWithoutResourcesInput.schema'
import { CourseUncheckedUpdateWithoutResourcesInputObjectSchema } from './CourseUncheckedUpdateWithoutResourcesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutResourcesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseCreateWithoutResourcesInputObjectSchema),
          z.lazy(() => CourseUncheckedCreateWithoutResourcesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CourseCreateOrConnectWithoutResourcesInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CourseUpsertWithoutResourcesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CourseWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CourseUpdateWithoutResourcesInputObjectSchema),
          z.lazy(() => CourseUncheckedUpdateWithoutResourcesInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const CourseUpdateOneRequiredWithoutResourcesNestedInputObjectSchema =
  Schema
