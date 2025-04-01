import { z } from 'zod'
import { DanceStyleFindManySchema } from '../findManyDanceStyle.schema'
import { ProfileArgsObjectSchema } from './ProfileArgs.schema'
import { PostFindManySchema } from '../findManyPost.schema'
import { GuestFindManySchema } from '../findManyGuest.schema'
import { EventCountOutputTypeArgsObjectSchema } from './EventCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventInclude> = z
  .object({
    styles: z
      .union([z.boolean(), z.lazy(() => DanceStyleFindManySchema)])
      .optional(),
    creator: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    organizer: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    venue: z
      .union([z.boolean(), z.lazy(() => ProfileArgsObjectSchema)])
      .optional(),
    posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
    guests: z
      .union([z.boolean(), z.lazy(() => GuestFindManySchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => EventCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()

export const EventIncludeObjectSchema = Schema
