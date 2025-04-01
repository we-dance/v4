import { z } from 'zod'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceUpdateWithoutStyleInputObjectSchema } from './ExperienceUpdateWithoutStyleInput.schema'
import { ExperienceUncheckedUpdateWithoutStyleInputObjectSchema } from './ExperienceUncheckedUpdateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateWithWhereUniqueWithoutStyleInput> =
  z
    .object({
      where: z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ExperienceUpdateWithoutStyleInputObjectSchema),
        z.lazy(() => ExperienceUncheckedUpdateWithoutStyleInputObjectSchema),
      ]),
    })
    .strict()

export const ExperienceUpdateWithWhereUniqueWithoutStyleInputObjectSchema =
  Schema
