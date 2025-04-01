import { z } from 'zod'
import { CourseResourceScalarWhereInputObjectSchema } from './CourseResourceScalarWhereInput.schema'
import { CourseResourceUpdateManyMutationInputObjectSchema } from './CourseResourceUpdateManyMutationInput.schema'
import { CourseResourceUncheckedUpdateManyWithoutResourcesInputObjectSchema } from './CourseResourceUncheckedUpdateManyWithoutResourcesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceUpdateManyWithWhereWithoutCourseInput> =
  z
    .object({
      where: z.lazy(() => CourseResourceScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CourseResourceUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CourseResourceUncheckedUpdateManyWithoutResourcesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CourseResourceUpdateManyWithWhereWithoutCourseInputObjectSchema =
  Schema
