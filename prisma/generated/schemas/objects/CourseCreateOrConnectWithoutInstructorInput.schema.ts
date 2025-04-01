import { z } from 'zod'
import { CourseWhereUniqueInputObjectSchema } from './CourseWhereUniqueInput.schema'
import { CourseCreateWithoutInstructorInputObjectSchema } from './CourseCreateWithoutInstructorInput.schema'
import { CourseUncheckedCreateWithoutInstructorInputObjectSchema } from './CourseUncheckedCreateWithoutInstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseCreateOrConnectWithoutInstructorInput> = z
  .object({
    where: z.lazy(() => CourseWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CourseCreateWithoutInstructorInputObjectSchema),
      z.lazy(() => CourseUncheckedCreateWithoutInstructorInputObjectSchema),
    ]),
  })
  .strict()

export const CourseCreateOrConnectWithoutInstructorInputObjectSchema = Schema
