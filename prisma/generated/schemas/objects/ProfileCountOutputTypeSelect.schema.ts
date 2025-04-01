import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCountOutputTypeSelect> = z
  .object({
    posts: z.boolean().optional(),
    eventsCreated: z.boolean().optional(),
    eventsOrganized: z.boolean().optional(),
    eventsHosted: z.boolean().optional(),
    coursesAsinstructor: z.boolean().optional(),
    styles: z.boolean().optional(),
    followers: z.boolean().optional(),
    following: z.boolean().optional(),
    cities: z.boolean().optional(),
    eventsParticipated: z.boolean().optional(),
    videosAdded: z.boolean().optional(),
    votes: z.boolean().optional(),
  })
  .strict()

export const ProfileCountOutputTypeSelectObjectSchema = Schema
