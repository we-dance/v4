import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    hashtag: z.string().optional(),
  })
  .strict()

export const DanceStyleWhereUniqueInputObjectSchema = Schema
