import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.RedirectCreateManyInput> = z
  .object({
    id: z.string().optional(),
    from: z.string(),
    to: z.string(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const RedirectCreateManyInputObjectSchema = Schema
