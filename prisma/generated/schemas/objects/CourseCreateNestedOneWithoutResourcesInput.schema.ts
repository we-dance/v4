import { z } from 'zod'
import { CourseCreateWithoutResourcesInputObjectSchema } from './CourseCreateWithoutResourcesInput.schema'
import { CourseUncheckedCreateWithoutResourcesInputObjectSchema } from './CourseUncheckedCreateWithoutResourcesInput.schema'
import { CourseCreateOrConnectWithoutResourcesInputObjectSchema } from './CourseCreateOrConnectWithoutResourcesInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateNestedOneWithoutResourcesInput> = z
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
    connect: z.lazy(() => CourseWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const CourseCreateNestedOneWithoutResourcesInputObjectSchema = Schema
