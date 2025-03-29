import { z } from 'zod'
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'
import { UserCreateNestedOneWithoutProfileInputObjectSchema } from './UserCreateNestedOneWithoutProfileInput.schema'
import { CityCreateNestedOneWithoutProfilesInputObjectSchema } from './CityCreateNestedOneWithoutProfilesInput.schema'
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema'
import { EventCreateNestedManyWithoutOrganizerInputObjectSchema } from './EventCreateNestedManyWithoutOrganizerInput.schema'
import { EventCreateNestedManyWithoutVenueInputObjectSchema } from './EventCreateNestedManyWithoutVenueInput.schema'
import { CourseCreateNestedManyWithoutInstructorInputObjectSchema } from './CourseCreateNestedManyWithoutInstructorInput.schema'
import { UserCreateNestedOneWithoutProfilesCreatedInputObjectSchema } from './UserCreateNestedOneWithoutProfilesCreatedInput.schema'
import { ExperienceCreateNestedManyWithoutProfileInputObjectSchema } from './ExperienceCreateNestedManyWithoutProfileInput.schema'
import { ProfileFollowerCreateNestedManyWithoutProfileInputObjectSchema } from './ProfileFollowerCreateNestedManyWithoutProfileInput.schema'
import { ProfileFollowerCreateNestedManyWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateNestedManyWithoutFollowerInput.schema'
import { CitySubscriberCreateNestedManyWithoutProfileInputObjectSchema } from './CitySubscriberCreateNestedManyWithoutProfileInput.schema'
import { GuestCreateNestedManyWithoutProfileInputObjectSchema } from './GuestCreateNestedManyWithoutProfileInput.schema'
import { VideoCreateNestedManyWithoutCreatedByInputObjectSchema } from './VideoCreateNestedManyWithoutCreatedByInput.schema'
import { VoteCreateNestedManyWithoutCreatedByInputObjectSchema } from './VoteCreateNestedManyWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ])
)

const Schema: z.ZodType<Prisma.ProfileCreateWithoutEventsCreatedInput> = z
  .object({
    id: z.string().optional(),
    username: z.string(),
    firebaseUsername: z.string().optional(),
    pronounce: z.string().optional(),
    name: z.string(),
    bio: z.string().optional(),
    story: z.string().optional(),
    firebaseId: z.string().optional(),
    claimed: z.boolean().optional(),
    formattedAddress: z.string().optional().nullable(),
    mapUrl: z.string().optional().nullable(),
    lng: z.number().optional().nullable(),
    lat: z.number().optional().nullable(),
    placeId: z.string().optional().nullable(),
    type: z.string(),
    photo: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    instagram: z.string().optional().nullable(),
    facebook: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    youtube: z.string().optional().nullable(),
    spotify: z.string().optional().nullable(),
    tiktok: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
    whatsapp: z.string().optional().nullable(),
    threads: z.string().optional().nullable(),
    twitter: z.string().optional().nullable(),
    vk: z.string().optional().nullable(),
    telegram: z.string().optional().nullable(),
    couchsurfing: z.string().optional().nullable(),
    airbnb: z.string().optional().nullable(),
    blablacar: z.string().optional().nullable(),
    lastLoginAt: z.coerce.date().optional().nullable(),
    isDeleted: z.boolean().optional(),
    deletedAt: z.coerce.date().optional().nullable(),
    deletedReason: z.string().optional().nullable(),
    followersCount: z.number().optional(),
    followingCount: z.number().optional(),
    viewsCount: z.number().optional(),
    visibility: z.string().optional(),
    timezone: z.string().optional().nullable(),
    locales: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    gender: z.string().optional().nullable(),
    birthday: z.coerce.date().optional().nullable(),
    objectives: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    step: z.string().optional().nullable(),
    invitedBy: z.string().optional().nullable(),
    daysUsed: z.number().optional().nullable(),
    pwaUsed: z.boolean().optional().nullable(),
    oldCities: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    privacySettings: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z
      .lazy(() => UserCreateNestedOneWithoutProfileInputObjectSchema)
      .optional(),
    city: z
      .lazy(() => CityCreateNestedOneWithoutProfilesInputObjectSchema)
      .optional(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
    eventsOrganized: z
      .lazy(() => EventCreateNestedManyWithoutOrganizerInputObjectSchema)
      .optional(),
    eventsHosted: z
      .lazy(() => EventCreateNestedManyWithoutVenueInputObjectSchema)
      .optional(),
    coursesAsinstructor: z
      .lazy(() => CourseCreateNestedManyWithoutInstructorInputObjectSchema)
      .optional(),
    createdBy: z
      .lazy(() => UserCreateNestedOneWithoutProfilesCreatedInputObjectSchema)
      .optional(),
    styles: z
      .lazy(() => ExperienceCreateNestedManyWithoutProfileInputObjectSchema)
      .optional(),
    followers: z
      .lazy(
        () => ProfileFollowerCreateNestedManyWithoutProfileInputObjectSchema
      )
      .optional(),
    following: z
      .lazy(
        () => ProfileFollowerCreateNestedManyWithoutFollowerInputObjectSchema
      )
      .optional(),
    cities: z
      .lazy(() => CitySubscriberCreateNestedManyWithoutProfileInputObjectSchema)
      .optional(),
    eventsParticipated: z
      .lazy(() => GuestCreateNestedManyWithoutProfileInputObjectSchema)
      .optional(),
    videosAdded: z
      .lazy(() => VideoCreateNestedManyWithoutCreatedByInputObjectSchema)
      .optional(),
    votes: z
      .lazy(() => VoteCreateNestedManyWithoutCreatedByInputObjectSchema)
      .optional(),
  })
  .strict()

export const ProfileCreateWithoutEventsCreatedInputObjectSchema = Schema
