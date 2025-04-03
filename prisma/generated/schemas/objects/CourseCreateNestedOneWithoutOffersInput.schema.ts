import { z } from 'zod'
import { CourseCreateWithoutOffersInputObjectSchema } from './CourseCreateWithoutOffersInput.schema'
import { CourseUncheckedCreateWithoutOffersInputObjectSchema } from './CourseUncheckedCreateWithoutOffersInput.schema'
import { CourseCreateOrConnectWithoutOffersInputObjectSchema } from './CourseCreateOrConnectWithoutOffersInput.schema'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateNestedOneWithoutOffersInput> = z
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
    connect: z.lazy(() => CourseWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const CourseCreateNestedOneWithoutOffersInputObjectSchema = Schema
