import { z } from 'zod'
import { EventUncheckedCreateNestedManyWithoutStylesInputObjectSchema } from './EventUncheckedCreateNestedManyWithoutStylesInput.schema'
import { ExperienceUncheckedCreateNestedManyWithoutStyleInputObjectSchema } from './ExperienceUncheckedCreateNestedManyWithoutStyleInput.schema'
import { VideoUncheckedCreateNestedManyWithoutStyleInputObjectSchema } from './VideoUncheckedCreateNestedManyWithoutStyleInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUncheckedCreateWithoutPostsInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    hashtag: z.string(),
    synonyms: z.string().optional().nullable(),
    regexp: z.string().optional().nullable(),
    popular: z.boolean().optional(),
    popularity: z.number().optional().nullable(),
    familyOnly: z.boolean().optional(),
    description: z.string().optional().nullable(),
    history: z.string().optional().nullable(),
    origins: z.string().optional().nullable(),
    adjectives: z.string().optional().nullable(),
    type: z.string().optional().nullable(),
    holding: z.string().optional().nullable(),
    year: z.string().optional().nullable(),
    predecessors: z.string().optional().nullable(),
    parent: z.string().optional().nullable(),
    influence: z.string().optional().nullable(),
    family: z.string().optional().nullable(),
    region: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    genres: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    root: z.boolean().optional().nullable(),
    partner: z.boolean().optional().nullable(),
    group: z.boolean().optional().nullable(),
    related: z.string().optional().nullable(),
    music: z.string().optional().nullable(),
    timing: z.string().optional().nullable(),
    active: z.boolean().optional().nullable(),
    video: z.string().optional().nullable(),
    intro: z.string().optional().nullable(),
    membersCount: z.number().optional(),
    eventsCount: z.number().optional(),
    events: z
      .lazy(() => EventUncheckedCreateNestedManyWithoutStylesInputObjectSchema)
      .optional(),
    experiences: z
      .lazy(
        () => ExperienceUncheckedCreateNestedManyWithoutStyleInputObjectSchema
      )
      .optional(),
    videos: z
      .lazy(() => VideoUncheckedCreateNestedManyWithoutStyleInputObjectSchema)
      .optional(),
  })
  .strict()

export const DanceStyleUncheckedCreateWithoutPostsInputObjectSchema = Schema
