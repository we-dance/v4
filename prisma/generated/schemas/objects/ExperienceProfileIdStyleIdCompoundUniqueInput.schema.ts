import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceProfileIdStyleIdCompoundUniqueInput> =
  z
    .object({
      profileId: z.string(),
      styleId: z.number(),
    })
    .strict()

export const ExperienceProfileIdStyleIdCompoundUniqueInputObjectSchema = Schema
