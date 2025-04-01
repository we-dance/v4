import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'
import { CityOrderByWithRelationInputObjectSchema } from './CityOrderByWithRelationInput.schema'
import { PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema'
import { EventOrderByRelationAggregateInputObjectSchema } from './EventOrderByRelationAggregateInput.schema'
import { CourseOrderByRelationAggregateInputObjectSchema } from './CourseOrderByRelationAggregateInput.schema'
import { ExperienceOrderByRelationAggregateInputObjectSchema } from './ExperienceOrderByRelationAggregateInput.schema'
import { ProfileFollowerOrderByRelationAggregateInputObjectSchema } from './ProfileFollowerOrderByRelationAggregateInput.schema'
import { CitySubscriberOrderByRelationAggregateInputObjectSchema } from './CitySubscriberOrderByRelationAggregateInput.schema'
import { GuestOrderByRelationAggregateInputObjectSchema } from './GuestOrderByRelationAggregateInput.schema'
import { VideoOrderByRelationAggregateInputObjectSchema } from './VideoOrderByRelationAggregateInput.schema'
import { VoteOrderByRelationAggregateInputObjectSchema } from './VoteOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    firebaseUsername: z.lazy(() => SortOrderSchema).optional(),
    pronounce: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    bio: z.lazy(() => SortOrderSchema).optional(),
    story: z.lazy(() => SortOrderSchema).optional(),
    firebaseId: z.lazy(() => SortOrderSchema).optional(),
    claimed: z.lazy(() => SortOrderSchema).optional(),
    formattedAddress: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    mapUrl: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    lng: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    lat: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    placeId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    photo: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    website: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    instagram: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    facebook: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    phone: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    youtube: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    spotify: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    tiktok: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    linkedin: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    whatsapp: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    threads: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    twitter: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    vk: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    telegram: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    couchsurfing: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    airbnb: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    blablacar: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdById: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    lastLoginAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    isDeleted: z.lazy(() => SortOrderSchema).optional(),
    deletedAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    deletedReason: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    followersCount: z.lazy(() => SortOrderSchema).optional(),
    followingCount: z.lazy(() => SortOrderSchema).optional(),
    viewsCount: z.lazy(() => SortOrderSchema).optional(),
    visibility: z.lazy(() => SortOrderSchema).optional(),
    timezone: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    locales: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    gender: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    birthday: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    objectives: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    step: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    invitedBy: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    daysUsed: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    pwaUsed: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    oldCities: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    privacySettings: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    userId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    cityId: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputObjectSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    city: z.lazy(() => CityOrderByWithRelationInputObjectSchema).optional(),
    posts: z
      .lazy(() => PostOrderByRelationAggregateInputObjectSchema)
      .optional(),
    eventsCreated: z
      .lazy(() => EventOrderByRelationAggregateInputObjectSchema)
      .optional(),
    eventsOrganized: z
      .lazy(() => EventOrderByRelationAggregateInputObjectSchema)
      .optional(),
    eventsHosted: z
      .lazy(() => EventOrderByRelationAggregateInputObjectSchema)
      .optional(),
    coursesAsinstructor: z
      .lazy(() => CourseOrderByRelationAggregateInputObjectSchema)
      .optional(),
    createdBy: z
      .lazy(() => UserOrderByWithRelationInputObjectSchema)
      .optional(),
    styles: z
      .lazy(() => ExperienceOrderByRelationAggregateInputObjectSchema)
      .optional(),
    followers: z
      .lazy(() => ProfileFollowerOrderByRelationAggregateInputObjectSchema)
      .optional(),
    following: z
      .lazy(() => ProfileFollowerOrderByRelationAggregateInputObjectSchema)
      .optional(),
    cities: z
      .lazy(() => CitySubscriberOrderByRelationAggregateInputObjectSchema)
      .optional(),
    eventsParticipated: z
      .lazy(() => GuestOrderByRelationAggregateInputObjectSchema)
      .optional(),
    videosAdded: z
      .lazy(() => VideoOrderByRelationAggregateInputObjectSchema)
      .optional(),
    votes: z
      .lazy(() => VoteOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()

export const ProfileOrderByWithRelationInputObjectSchema = Schema
