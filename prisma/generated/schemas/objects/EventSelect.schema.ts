import { z } from 'zod'
import { DanceStyleFindManySchema } from '../findManyDanceStyle.schema'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { PostFindManySchema } from '../findManyPost.schema'
import { GuestFindManySchema } from '../findManyGuest.schema'
import { EventCountOutputTypeArgsObjectSchema } from './EventCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventSelect> = z
  .object({
    id: z.boolean().optional(),
    shortId: z.boolean().optional(),
    slug: z.boolean().optional(),
    name: z.boolean().optional(),
    startDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    type: z.boolean().optional(),
    description: z.boolean().optional(),
    cover: z.boolean().optional(),
    price: z.boolean().optional(),
    firebaseId: z.boolean().optional(),
    published: z.boolean().optional(),
    styles: z
      .union([z.boolean(), z.lazy(() => DanceStyleFindManySchema)])
      .optional(),
    creatorId: z.boolean().optional(),
    creator: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    organizerId: z.boolean().optional(),
    organizer: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    venueId: z.boolean().optional(),
    venue: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    guests: z
      .union([z.boolean(), z.lazy(() => GuestFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => EventCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const EventSelectObjectSchema = Schema
