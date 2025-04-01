import { z } from 'zod'
import { EventFindManySchema } from '../findManyEvent.schema'
import { ExperienceFindManySchema } from '../findManyExperience.schema'
import { VideoFindManySchema } from '../findManyVideo.schema'
import { PostFindManySchema } from '../findManyPost.schema'
import { DanceStyleCountOutputTypeArgsObjectSchema } from './DanceStyleCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    hashtag: z.boolean().optional(),
    synonyms: z.boolean().optional(),
    regexp: z.boolean().optional(),
    popular: z.boolean().optional(),
    popularity: z.boolean().optional(),
    familyOnly: z.boolean().optional(),
    description: z.boolean().optional(),
    history: z.boolean().optional(),
    origins: z.boolean().optional(),
    adjectives: z.boolean().optional(),
    type: z.boolean().optional(),
    holding: z.boolean().optional(),
    year: z.boolean().optional(),
    predecessors: z.boolean().optional(),
    parent: z.boolean().optional(),
    influence: z.boolean().optional(),
    family: z.boolean().optional(),
    region: z.boolean().optional(),
    country: z.boolean().optional(),
    genres: z.boolean().optional(),
    source: z.boolean().optional(),
    root: z.boolean().optional(),
    partner: z.boolean().optional(),
    group: z.boolean().optional(),
    related: z.boolean().optional(),
    music: z.boolean().optional(),
    timing: z.boolean().optional(),
    active: z.boolean().optional(),
    video: z.boolean().optional(),
    intro: z.boolean().optional(),
    membersCount: z.boolean().optional(),
    eventsCount: z.boolean().optional(),
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

export const DanceStyleSelectObjectSchema = Schema
