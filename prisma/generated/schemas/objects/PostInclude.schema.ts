import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { EventArgsObjectSchema } from './EventArgs.schema'
import { DanceStyleArgsObjectSchema } from './DanceStyleArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostInclude> = z
  .object({
    author: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    event: z
      .union([z.boolean(), z.lazy(() => EventArgsObjectSchema)])
      .optional(),
    style: z
      .union([z.boolean(), z.lazy(() => DanceStyleArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const PostIncludeObjectSchema = Schema
