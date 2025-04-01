import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateWithoutCoursesAsinstructorInput.schema'
import { ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUncheckedCreateWithoutCoursesAsinstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutCoursesAsinstructorInput> =
  z
    .object({
      where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => ProfileCreateWithoutCoursesAsinstructorInputObjectSchema),
        z.lazy(
          () =>
            ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ProfileCreateOrConnectWithoutCoursesAsinstructorInputObjectSchema =
  Schema
