import { z } from 'zod'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceCreateWithoutStyleInputObjectSchema } from './ExperienceCreateWithoutStyleInput.schema'
import { ExperienceUncheckedCreateWithoutStyleInputObjectSchema } from './ExperienceUncheckedCreateWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateOrConnectWithoutStyleInput> = z
  .object({
    where: z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ExperienceCreateWithoutStyleInputObjectSchema),
      z.lazy(() => ExperienceUncheckedCreateWithoutStyleInputObjectSchema),
    ]),
  })
  .strict()

export const ExperienceCreateOrConnectWithoutStyleInputObjectSchema = Schema
