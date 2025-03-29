import { z } from 'zod'
import { DanceStyleArgsObjectSchema } from './DanceStyleArgs.schema'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoInclude> = z
  .object({
    style: z
      .union([z.boolean(), z.lazy(() => DanceStyleArgsObjectSchema)])
      .optional(),
    createdBy: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const VideoIncludeObjectSchema = Schema
