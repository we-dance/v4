import { z } from 'zod'
import { DanceStyleWhereInputObjectSchema } from './DanceStyleWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleListRelationFilter> = z
  .object({
    every: z.lazy(() => DanceStyleWhereInputObjectSchema).optional(),
    some: z.lazy(() => DanceStyleWhereInputObjectSchema).optional(),
    none: z.lazy(() => DanceStyleWhereInputObjectSchema).optional(),
  })
  .strict()

export const DanceStyleListRelationFilterObjectSchema = Schema
