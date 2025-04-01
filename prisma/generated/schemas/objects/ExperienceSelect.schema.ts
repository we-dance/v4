import { z } from 'zod'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { DanceStyleArgsObjectSchema } from './DanceStyleArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceSelect> = z
  .object({
    level: z.boolean().optional(),
    highlighted: z.boolean().optional(),
    profileId: z.boolean().optional(),
    profile: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    styleId: z.boolean().optional(),
    style: z
      .union([z.boolean(), z.lazy(() => DanceStyleArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const ExperienceSelectObjectSchema = Schema
