import { z } from 'zod'
import { ProfileCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateWithoutCoursesAsinstructorInput.schema'
import { ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUncheckedCreateWithoutCoursesAsinstructorInput.schema'
import { ProfileCreateOrConnectWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateOrConnectWithoutCoursesAsinstructorInput.schema'
import { ProfileUpsertWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUpsertWithoutCoursesAsinstructorInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUpdateWithoutCoursesAsinstructorInput.schema'
import { ProfileUncheckedUpdateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUncheckedUpdateWithoutCoursesAsinstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateOneWithoutCoursesAsinstructorNestedInput> =
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
      upsert: z
        .lazy(() => ProfileUpsertWithoutCoursesAsinstructorInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => ProfileUpdateWithoutCoursesAsinstructorInputObjectSchema
          ),
          z.lazy(
            () =>
              ProfileUncheckedUpdateWithoutCoursesAsinstructorInputObjectSchema
          ),
        ])
        .optional(),
    })
    .strict()

export const ProfileUpdateOneWithoutCoursesAsinstructorNestedInputObjectSchema =
  Schema
