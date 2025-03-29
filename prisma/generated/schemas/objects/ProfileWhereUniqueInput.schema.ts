import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    username: z.string().optional(),
    userId: z.string().optional(),
  })
  .strict()

export const ProfileWhereUniqueInputObjectSchema = Schema
