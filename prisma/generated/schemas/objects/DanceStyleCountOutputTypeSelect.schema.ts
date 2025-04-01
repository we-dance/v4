import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleCountOutputTypeSelect> = z
  .object({
    events: z.boolean().optional(),
    experiences: z.boolean().optional(),
    videos: z.boolean().optional(),
    posts: z.boolean().optional(),
  })
  .strict()

export const DanceStyleCountOutputTypeSelectObjectSchema = Schema
