import { z } from 'zod'
import { ExperienceWhereInputObjectSchema } from './ExperienceWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceListRelationFilter> = z
  .object({
    every: z.lazy(() => ExperienceWhereInputObjectSchema).optional(),
    some: z.lazy(() => ExperienceWhereInputObjectSchema).optional(),
    none: z.lazy(() => ExperienceWhereInputObjectSchema).optional(),
  })
  .strict()

export const ExperienceListRelationFilterObjectSchema = Schema
