import { z } from 'zod'
import { ProfileCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateWithoutCoursesAsinstructorInput.schema'
import { ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUncheckedCreateWithoutCoursesAsinstructorInput.schema'
import { ProfileCreateOrConnectWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateOrConnectWithoutCoursesAsinstructorInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutCoursesAsinstructorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => ProfileCreateWithoutCoursesAsinstructorInputObjectSchema
          ),
          z.lazy(
            () =>
              ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            ProfileCreateOrConnectWithoutCoursesAsinstructorInputObjectSchema
        )
        .optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
    })
    .strict()

export const ProfileCreateNestedOneWithoutCoursesAsinstructorInputObjectSchema =
  Schema
