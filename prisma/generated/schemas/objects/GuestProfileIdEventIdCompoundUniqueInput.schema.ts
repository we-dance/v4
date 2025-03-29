import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestProfileIdEventIdCompoundUniqueInput> = z
  .object({
    profileId: z.string(),
    eventId: z.string(),
  })
  .strict()

export const GuestProfileIdEventIdCompoundUniqueInputObjectSchema = Schema
