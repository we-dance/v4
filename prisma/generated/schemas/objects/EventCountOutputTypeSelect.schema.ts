import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z
  .object({
    styles: z.boolean().optional(),
    posts: z.boolean().optional(),
    guests: z.boolean().optional(),
  })
  .strict()

export const EventCountOutputTypeSelectObjectSchema = Schema
