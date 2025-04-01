import { z } from 'zod'
import { ProfileUpdateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUpdateWithoutCoursesAsinstructorInput.schema'
import { ProfileUncheckedUpdateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUncheckedUpdateWithoutCoursesAsinstructorInput.schema'
import { ProfileCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileCreateWithoutCoursesAsinstructorInput.schema'
import { ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema } from './ProfileUncheckedCreateWithoutCoursesAsinstructorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithoutCoursesAsinstructorInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutCoursesAsinstructorInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedUpdateWithoutCoursesAsinstructorInputObjectSchema
      ),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutCoursesAsinstructorInputObjectSchema),
      z.lazy(
        () => ProfileUncheckedCreateWithoutCoursesAsinstructorInputObjectSchema
      ),
    ]),
  })
  .strict()

export const ProfileUpsertWithoutCoursesAsinstructorInputObjectSchema = Schema
