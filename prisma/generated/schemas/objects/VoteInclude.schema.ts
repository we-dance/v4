import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteInclude> = z
  .object({
    createdBy: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const VoteIncludeObjectSchema = Schema
