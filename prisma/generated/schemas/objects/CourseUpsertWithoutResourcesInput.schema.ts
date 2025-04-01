import { z } from 'zod'
import { CourseUpdateWithoutResourcesInputObjectSchema } from './CourseUpdateWithoutResourcesInput.schema'
import { CourseUncheckedUpdateWithoutResourcesInputObjectSchema } from './CourseUncheckedUpdateWithoutResourcesInput.schema'
import { CourseCreateWithoutResourcesInputObjectSchema } from './CourseCreateWithoutResourcesInput.schema'
import { CourseUncheckedCreateWithoutResourcesInputObjectSchema } from './CourseUncheckedCreateWithoutResourcesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUpsertWithoutResourcesInput> = z
  .object({
    update: z.union([
      z.lazy(() => CourseUpdateWithoutResourcesInputObjectSchema),
      z.lazy(() => CourseUncheckedUpdateWithoutResourcesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CourseCreateWithoutResourcesInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutResourcesInputObjectSchema),
    ]),
  })
  .strict()

export const CourseUpsertWithoutResourcesInputObjectSchema = Schema
