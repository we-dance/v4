import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoCreateManyInput> = z
  .object({
    id: z.string().optional(),
    url: z.string(),
    styleId: z.number(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    createdById: z.string().optional().nullable(),
  })
  .strict()

export const VideoCreateManyInputObjectSchema = Schema
