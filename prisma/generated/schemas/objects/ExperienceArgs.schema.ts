import { z } from 'zod'
import { ExperienceSelectObjectSchema } from './ExperienceSelect.schema'
import { ExperienceIncludeObjectSchema } from './ExperienceInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceArgs> = z
  .object({
    select: z.lazy(() => ExperienceSelectObjectSchema).optional(),
    include: z.lazy(() => ExperienceIncludeObjectSchema).optional(),
  })
  .strict()

export const ExperienceArgsObjectSchema = Schema
