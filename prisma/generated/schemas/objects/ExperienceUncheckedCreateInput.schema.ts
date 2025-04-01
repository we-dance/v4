import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUncheckedCreateInput> = z
  .object({
    level: z.string(),
    highlighted: z.boolean(),
    profileId: z.string(),
    styleId: z.number(),
  })
  .strict()

export const ExperienceUncheckedCreateInputObjectSchema = Schema
