import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    url: z.string().optional(),
  })
  .strict()

export const VideoWhereUniqueInputObjectSchema = Schema
