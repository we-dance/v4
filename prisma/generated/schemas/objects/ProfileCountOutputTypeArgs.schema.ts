import { z } from 'zod'
import { ProfileCountOutputTypeSelectObjectSchema } from './ProfileCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => ProfileCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()

export const ProfileCountOutputTypeArgsObjectSchema = Schema
