import { z } from 'zod'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceCreateWithoutProfileInputObjectSchema } from './ExperienceCreateWithoutProfileInput.schema'
import { ExperienceUncheckedCreateWithoutProfileInputObjectSchema } from './ExperienceUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateOrConnectWithoutProfileInput> = z
  .object({
    where: z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ExperienceCreateWithoutProfileInputObjectSchema),
      z.lazy(() => ExperienceUncheckedCreateWithoutProfileInputObjectSchema),
    ]),
  })
  .strict()

export const ExperienceCreateOrConnectWithoutProfileInputObjectSchema = Schema
