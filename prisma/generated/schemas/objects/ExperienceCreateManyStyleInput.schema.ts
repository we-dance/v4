import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateManyStyleInput> = z
  .object({
    level: z.string(),
    highlighted: z.boolean(),
    profileId: z.string(),
  })
  .strict()

export const ExperienceCreateManyStyleInputObjectSchema = Schema
