import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    hashtag: z.literal(true).optional(),
    synonyms: z.literal(true).optional(),
    regexp: z.literal(true).optional(),
    popular: z.literal(true).optional(),
    popularity: z.literal(true).optional(),
    familyOnly: z.literal(true).optional(),
    description: z.literal(true).optional(),
    history: z.literal(true).optional(),
    origins: z.literal(true).optional(),
    adjectives: z.literal(true).optional(),
    type: z.literal(true).optional(),
    holding: z.literal(true).optional(),
    year: z.literal(true).optional(),
    predecessors: z.literal(true).optional(),
    parent: z.literal(true).optional(),
    influence: z.literal(true).optional(),
    family: z.literal(true).optional(),
    region: z.literal(true).optional(),
    country: z.literal(true).optional(),
    genres: z.literal(true).optional(),
    source: z.literal(true).optional(),
    root: z.literal(true).optional(),
    partner: z.literal(true).optional(),
    group: z.literal(true).optional(),
    related: z.literal(true).optional(),
    music: z.literal(true).optional(),
    timing: z.literal(true).optional(),
    active: z.literal(true).optional(),
    video: z.literal(true).optional(),
    intro: z.literal(true).optional(),
    membersCount: z.literal(true).optional(),
    eventsCount: z.literal(true).optional(),
  })
  .strict()

export const DanceStyleMaxAggregateInputObjectSchema = Schema
