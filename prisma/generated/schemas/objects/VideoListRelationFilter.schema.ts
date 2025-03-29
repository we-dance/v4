import { z } from 'zod'
import { VideoWhereInputObjectSchema } from './VideoWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoListRelationFilter> = z
  .object({
    every: z.lazy(() => VideoWhereInputObjectSchema).optional(),
    some: z.lazy(() => VideoWhereInputObjectSchema).optional(),
    none: z.lazy(() => VideoWhereInputObjectSchema).optional(),
  })
  .strict()

export const VideoListRelationFilterObjectSchema = Schema
