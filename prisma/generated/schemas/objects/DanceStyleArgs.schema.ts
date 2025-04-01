import { z } from 'zod'
import { DanceStyleSelectObjectSchema } from './DanceStyleSelect.schema'
import { DanceStyleIncludeObjectSchema } from './DanceStyleInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleArgs> = z
  .object({
    select: z.lazy(() => DanceStyleSelectObjectSchema).optional(),
    include: z.lazy(() => DanceStyleIncludeObjectSchema).optional(),
  })
  .strict()

export const DanceStyleArgsObjectSchema = Schema
