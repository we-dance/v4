import { z } from 'zod'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceUpdateWithoutStyleInputObjectSchema } from './ExperienceUpdateWithoutStyleInput.schema'
import { ExperienceUncheckedUpdateWithoutStyleInputObjectSchema } from './ExperienceUncheckedUpdateWithoutStyleInput.schema'
import { ExperienceCreateWithoutStyleInputObjectSchema } from './ExperienceCreateWithoutStyleInput.schema'
import { ExperienceUncheckedCreateWithoutStyleInputObjectSchema } from './ExperienceUncheckedCreateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpsertWithWhereUniqueWithoutStyleInput> =
  z
    .object({
      where: z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ExperienceUpdateWithoutStyleInputObjectSchema),
        z.lazy(() => ExperienceUncheckedUpdateWithoutStyleInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ExperienceCreateWithoutStyleInputObjectSchema),
        z.lazy(() => ExperienceUncheckedCreateWithoutStyleInputObjectSchema),
      ]),
    })
    .strict()

export const ExperienceUpsertWithWhereUniqueWithoutStyleInputObjectSchema =
  Schema
