import { z } from 'zod'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceUpdateWithoutProfileInputObjectSchema } from './ExperienceUpdateWithoutProfileInput.schema'
import { ExperienceUncheckedUpdateWithoutProfileInputObjectSchema } from './ExperienceUncheckedUpdateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ExperienceUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => ExperienceUncheckedUpdateWithoutProfileInputObjectSchema),
      ]),
    })
    .strict()

export const ExperienceUpdateWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema
