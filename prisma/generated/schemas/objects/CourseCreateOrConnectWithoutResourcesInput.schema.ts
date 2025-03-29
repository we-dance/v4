import { z } from 'zod'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseCreateWithoutResourcesInputObjectSchema } from './CourseCreateWithoutResourcesInput.schema'
import { CourseUncheckedCreateWithoutResourcesInputObjectSchema } from './CourseUncheckedCreateWithoutResourcesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateOrConnectWithoutResourcesInput> = z
  .object({
    where: z.lazy(() => CourseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CourseCreateWithoutResourcesInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutResourcesInputObjectSchema),
    ]),
  })
  .strict()

export const CourseCreateOrConnectWithoutResourcesInputObjectSchema = Schema
