import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUncheckedCreateWithoutProfileInput> = z
  .object({
    level: z.string(),
    highlighted: z.boolean(),
    styleId: z.number(),
  })
  .strict()

export const ExperienceUncheckedCreateWithoutProfileInputObjectSchema = Schema
