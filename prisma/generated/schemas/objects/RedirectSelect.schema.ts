import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.RedirectSelect> = z
  .object({
    id: z.boolean().optional(),
    from: z.boolean().optional(),
    to: z.boolean().optional(),
    note: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict()

export const RedirectSelectObjectSchema = Schema
