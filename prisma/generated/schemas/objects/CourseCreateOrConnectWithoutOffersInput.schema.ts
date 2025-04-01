import { z } from 'zod'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseCreateWithoutOffersInputObjectSchema } from './CourseCreateWithoutOffersInput.schema'
import { CourseUncheckedCreateWithoutOffersInputObjectSchema } from './CourseUncheckedCreateWithoutOffersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateOrConnectWithoutOffersInput> = z
  .object({
    where: z.lazy(() => CourseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CourseCreateWithoutOffersInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutOffersInputObjectSchema),
    ]),
  })
  .strict()

export const CourseCreateOrConnectWithoutOffersInputObjectSchema = Schema
