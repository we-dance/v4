import { z } from 'zod'
import { DanceStyleArgsObjectSchema } from './DanceStyleArgs.schema'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoSelect> = z
  .object({
    id: z.boolean().optional(),
    url: z.boolean().optional(),
    styleId: z.boolean().optional(),
    style: z
      .union([z.boolean(), z.lazy(() => DanceStyleArgsObjectSchema)])
      .optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdBy: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    createdById: z.boolean().optional(),
  })
  .strict()

export const VideoSelectObjectSchema = Schema
