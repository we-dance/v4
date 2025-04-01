import { z } from 'zod'
import { CourseUpdateWithoutOffersInputObjectSchema } from './CourseUpdateWithoutOffersInput.schema'
import { CourseUncheckedUpdateWithoutOffersInputObjectSchema } from './CourseUncheckedUpdateWithoutOffersInput.schema'
import { CourseCreateWithoutOffersInputObjectSchema } from './CourseCreateWithoutOffersInput.schema'
import { CourseUncheckedCreateWithoutOffersInputObjectSchema } from './CourseUncheckedCreateWithoutOffersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpsertWithoutOffersInput> = z
  .object({
    update: z.union([
      z.lazy(() => CourseUpdateWithoutOffersInputObjectSchema),
      z.lazy(() => CourseUncheckedUpdateWithoutOffersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CourseCreateWithoutOffersInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutOffersInputObjectSchema),
    ]),
  })
  .strict()

export const CourseUpsertWithoutOffersInputObjectSchema = Schema
