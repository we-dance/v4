import { z } from 'zod'
import { UserArgsObjectSchema } from './UserArgs.schema'
import { CityArgsObjectSchema } from './CityArgs.schema'
import { PostFindManySchema } from '../findManyPost.schema'
import { EventFindManySchema } from '../findManyEvent.schema'
import { CourseFindManySchema } from '../findManyCourse.schema'
import { ExperienceFindManySchema } from '../findManyExperience.schema'
import { ProfileFollowerFindManySchema } from '../findManyProfileFollower.schema'
import { CitySubscriberFindManySchema } from '../findManyCitySubscriber.schema'
import { GuestFindManySchema } from '../findManyGuest.schema'
import { VideoFindManySchema } from '../findManyVideo.schema'
import { VoteFindManySchema } from '../findManyVote.schema'
import { ProfileCountOutputTypeArgsObjectSchema } from './ProfileCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    city: z.union([z.boolean(), z.lazy(() => CityArgsObjectSchema)]).optional(),
    posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
    eventsCreated: z
      .union([z.boolean(), z.lazy(() => EventFindManySchema)])
      .optional(),
    eventsOrganized: z
      .union([z.boolean(), z.lazy(() => EventFindManySchema)])
      .optional(),
    eventsHosted: z
      .union([z.boolean(), z.lazy(() => EventFindManySchema)])
      .optional(),
    coursesAsinstructor: z
      .union([z.boolean(), z.lazy(() => CourseFindManySchema)])
      .optional(),
    createdBy: z
      .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
      .optional(),
    styles: z
      .union([z.boolean(), z.lazy(() => ExperienceFindManySchema)])
      .optional(),
    followers: z
      .union([z.boolean(), z.lazy(() => ProfileFollowerFindManySchema)])
      .optional(),
    following: z
      .union([z.boolean(), z.lazy(() => ProfileFollowerFindManySchema)])
      .optional(),
    cities: z
      .union([z.boolean(), z.lazy(() => CitySubscriberFindManySchema)])
      .optional(),
    eventsParticipated: z
      .union([z.boolean(), z.lazy(() => GuestFindManySchema)])
      .optional(),
    videosAdded: z
      .union([z.boolean(), z.lazy(() => VideoFindManySchema)])
      .optional(),
    votes: z.union([z.boolean(), z.lazy(() => VoteFindManySchema)]).optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => ProfileCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const ProfileIncludeObjectSchema = Schema
