import { z } from 'zod'
import { ProfileFollowerSelectObjectSchema } from './ProfileFollowerSelect.schema'
import { ProfileFollowerIncludeObjectSchema } from './ProfileFollowerInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerArgs> = z
  .object({
    select: z.lazy(() => ProfileFollowerSelectObjectSchema).optional(),
    include: z.lazy(() => ProfileFollowerIncludeObjectSchema).optional(),
  })
  .strict()

export const ProfileFollowerArgsObjectSchema = Schema
