import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { DanceStyleArgsObjectSchema } from './DanceStyleArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceInclude> = z
  .object({
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    style: z
      .union([z.boolean(), z.lazy(() => DanceStyleArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const ExperienceIncludeObjectSchema = Schema
