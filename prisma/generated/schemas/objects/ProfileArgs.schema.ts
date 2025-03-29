import { z } from 'zod'
import { ProfileSelectObjectSchema } from './ProfileSelect.schema'
import { ProfileIncludeObjectSchema } from './ProfileInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileArgs> = z
  .object({
    select: z.lazy(() => ProfileSelectObjectSchema).optional(),
    include: z.lazy(() => ProfileIncludeObjectSchema).optional(),
  })
  .strict()

export const ProfileArgsObjectSchema = Schema
