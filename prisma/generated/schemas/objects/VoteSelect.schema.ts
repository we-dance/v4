import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteSelect> = z
  .object({
    id: z.boolean().optional(),
    winnerId: z.boolean().optional(),
    loserId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdBy: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    createdById: z.boolean().optional(),
  })
  .strict()

export const VoteSelectObjectSchema = Schema
