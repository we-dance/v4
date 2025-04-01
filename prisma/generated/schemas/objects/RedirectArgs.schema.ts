import { z } from 'zod'
import { RedirectSelectObjectSchema } from './RedirectSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.RedirectArgs> = z
  .object({
    select: z.lazy(() => RedirectSelectObjectSchema).optional(),
  })
  .strict()

export const RedirectArgsObjectSchema = Schema
