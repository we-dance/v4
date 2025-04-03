import { z } from 'zod'
import { VideoSelectObjectSchema } from './VideoSelect.schema'
import { VideoIncludeObjectSchema } from './VideoInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoArgs> = z
  .object({
    select: z.lazy(() => VideoSelectObjectSchema).optional(),
    include: z.lazy(() => VideoIncludeObjectSchema).optional(),
  })
  .strict()

export const VideoArgsObjectSchema = Schema
