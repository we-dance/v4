import { z } from 'zod'
import { DanceStyleCountOutputTypeSelectObjectSchema } from './DanceStyleCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCountOutputTypeArgs> = z
  .object({
    select: z
      .lazy(() => DanceStyleCountOutputTypeSelectObjectSchema)
      .optional(),
  })
  .strict()

export const DanceStyleCountOutputTypeArgsObjectSchema = Schema
