import { z } from 'zod'
import { CourseCreateWithoutOffersInputObjectSchema } from './CourseCreateWithoutOffersInput.schema'
import { CourseUncheckedCreateWithoutOffersInputObjectSchema } from './CourseUncheckedCreateWithoutOffersInput.schema'
import { CourseCreateOrConnectWithoutOffersInputObjectSchema } from './CourseCreateOrConnectWithoutOffersInput.schema'
import { CourseUpsertWithoutOffersInputObjectSchema } from './CourseUpsertWithoutOffersInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseUpdateWithoutOffersInputObjectSchema } from './CourseUpdateWithoutOffersInput.schema'
import { CourseUncheckedUpdateWithoutOffersInputObjectSchema } from './CourseUncheckedUpdateWithoutOffersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutOffersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CourseCreateWithoutOffersInputObjectSchema),
          z.lazy(() => CourseUncheckedCreateWithoutOffersInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CourseCreateOrConnectWithoutOffersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CourseUpsertWithoutOffersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CourseWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CourseUpdateWithoutOffersInputObjectSchema),
          z.lazy(() => CourseUncheckedUpdateWithoutOffersInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const CourseUpdateOneRequiredWithoutOffersNestedInputObjectSchema =
  Schema
