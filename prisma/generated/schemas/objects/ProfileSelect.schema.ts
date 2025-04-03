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

const Schema: z.ZodType<Prisma.ProfileSelect> = z
  .object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    firebaseUsername: z.boolean().optional(),
    pronounce: z.boolean().optional(),
    name: z.boolean().optional(),
    bio: z.boolean().optional(),
    story: z.boolean().optional(),
    firebaseId: z.boolean().optional(),
    claimed: z.boolean().optional(),
    formattedAddress: z.boolean().optional(),
    mapUrl: z.boolean().optional(),
    lng: z.boolean().optional(),
    lat: z.boolean().optional(),
    placeId: z.boolean().optional(),
    type: z.boolean().optional(),
    photo: z.boolean().optional(),
    website: z.boolean().optional(),
    instagram: z.boolean().optional(),
    facebook: z.boolean().optional(),
    phone: z.boolean().optional(),
    youtube: z.boolean().optional(),
    spotify: z.boolean().optional(),
    tiktok: z.boolean().optional(),
    linkedin: z.boolean().optional(),
    whatsapp: z.boolean().optional(),
    threads: z.boolean().optional(),
    twitter: z.boolean().optional(),
    vk: z.boolean().optional(),
    telegram: z.boolean().optional(),
    couchsurfing: z.boolean().optional(),
    airbnb: z.boolean().optional(),
    blablacar: z.boolean().optional(),
    createdById: z.boolean().optional(),
    lastLoginAt: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    deletedAt: z.boolean().optional(),
    deletedReason: z.boolean().optional(),
    followersCount: z.boolean().optional(),
    followingCount: z.boolean().optional(),
    viewsCount: z.boolean().optional(),
    visibility: z.boolean().optional(),
    timezone: z.boolean().optional(),
    locales: z.boolean().optional(),
    gender: z.boolean().optional(),
    birthday: z.boolean().optional(),
    objectives: z.boolean().optional(),
    step: z.boolean().optional(),
    invitedBy: z.boolean().optional(),
    daysUsed: z.boolean().optional(),
    pwaUsed: z.boolean().optional(),
    oldCities: z.boolean().optional(),
    privacySettings: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    cityId: z.boolean().optional(),
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
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z
      .union([
        z.boolean(),
        z.lazy(() => ProfileCountOutputTypeArgsObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const ProfileSelectObjectSchema = Schema
