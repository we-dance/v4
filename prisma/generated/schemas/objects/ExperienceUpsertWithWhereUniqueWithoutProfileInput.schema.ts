import { z } from 'zod'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceUpdateWithoutProfileInputObjectSchema } from './ExperienceUpdateWithoutProfileInput.schema'
import { ExperienceUncheckedUpdateWithoutProfileInputObjectSchema } from './ExperienceUncheckedUpdateWithoutProfileInput.schema'
import { ExperienceCreateWithoutProfileInputObjectSchema } from './ExperienceCreateWithoutProfileInput.schema'
import { ExperienceUncheckedCreateWithoutProfileInputObjectSchema } from './ExperienceUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpsertWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ExperienceUpdateWithoutProfileInputObjectSchema),
        z.lazy(() => ExperienceUncheckedUpdateWithoutProfileInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ExperienceCreateWithoutProfileInputObjectSchema),
        z.lazy(() => ExperienceUncheckedCreateWithoutProfileInputObjectSchema),
      ]),
    })
    .strict()

export const ExperienceUpsertWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema
