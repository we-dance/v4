import { z } from 'zod'
import { EventFindManySchema } from '../findManyEvent.schema'
import { ExperienceFindManySchema } from '../findManyExperience.schema'
import { VideoFindManySchema } from '../findManyVideo.schema'
import { PostFindManySchema } from '../findManyPost.schema'
import { DanceStyleCountOutputTypeArgsObjectSchema } from './DanceStyleCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleInclude> = z
  .object({
    events: z
      .union([z.boolean(), z.lazy(() => EventFindManySchema)])
      .optional(),
    experiences: z
      .union([z.boolean(), z.lazy(() => ExperienceFindManySchema)])
      .optional(),
    videos: z
      .union([z.boolean(), z.lazy(() => VideoFindManySchema)])
      .optional(),
    posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => DanceStyleCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const DanceStyleIncludeObjectSchema = Schema
