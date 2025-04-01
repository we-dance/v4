import { z } from 'zod'
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInput.schema'
import { EventUncheckedCreateNestedManyWithoutCreatorInputObjectSchema } from './EventUncheckedCreateNestedManyWithoutCreatorInput.schema'
import { EventUncheckedCreateNestedManyWithoutOrganizerInputObjectSchema } from './EventUncheckedCreateNestedManyWithoutOrganizerInput.schema'
import { EventUncheckedCreateNestedManyWithoutVenueInputObjectSchema } from './EventUncheckedCreateNestedManyWithoutVenueInput.schema'
import { CourseUncheckedCreateNestedManyWithoutInstructorInputObjectSchema } from './CourseUncheckedCreateNestedManyWithoutInstructorInput.schema'
import { ExperienceUncheckedCreateNestedManyWithoutProfileInputObjectSchema } from './ExperienceUncheckedCreateNestedManyWithoutProfileInput.schema'
import { ProfileFollowerUncheckedCreateNestedManyWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedCreateNestedManyWithoutProfileInput.schema'
import { ProfileFollowerUncheckedCreateNestedManyWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedCreateNestedManyWithoutFollowerInput.schema'
import { CitySubscriberUncheckedCreateNestedManyWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedCreateNestedManyWithoutProfileInput.schema'
import { GuestUncheckedCreateNestedManyWithoutProfileInputObjectSchema } from './GuestUncheckedCreateNestedManyWithoutProfileInput.schema'
import { VideoUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema } from './VideoUncheckedCreateNestedManyWithoutCreatedByInput.schema'
import { VoteUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema } from './VoteUncheckedCreateNestedManyWithoutCreatedByInput.schema'

import type { Prisma } from '@prisma/client'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ])
)

const Schema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z
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
    createdById: z.string().optional().nullable(),
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
    cityId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    posts: z
      .lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
    eventsCreated: z
      .lazy(() => EventUncheckedCreateNestedManyWithoutCreatorInputObjectSchema)
      .optional(),
    eventsOrganized: z
      .lazy(
        () => EventUncheckedCreateNestedManyWithoutOrganizerInputObjectSchema
      )
      .optional(),
    eventsHosted: z
      .lazy(() => EventUncheckedCreateNestedManyWithoutVenueInputObjectSchema)
      .optional(),
    coursesAsinstructor: z
      .lazy(
        () => CourseUncheckedCreateNestedManyWithoutInstructorInputObjectSchema
      )
      .optional(),
    styles: z
      .lazy(
        () => ExperienceUncheckedCreateNestedManyWithoutProfileInputObjectSchema
      )
      .optional(),
    followers: z
      .lazy(
        () =>
          ProfileFollowerUncheckedCreateNestedManyWithoutProfileInputObjectSchema
      )
      .optional(),
    following: z
      .lazy(
        () =>
          ProfileFollowerUncheckedCreateNestedManyWithoutFollowerInputObjectSchema
      )
      .optional(),
    cities: z
      .lazy(
        () =>
          CitySubscriberUncheckedCreateNestedManyWithoutProfileInputObjectSchema
      )
      .optional(),
    eventsParticipated: z
      .lazy(() => GuestUncheckedCreateNestedManyWithoutProfileInputObjectSchema)
      .optional(),
    videosAdded: z
      .lazy(
        () => VideoUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema
      )
      .optional(),
    votes: z
      .lazy(
        () => VoteUncheckedCreateNestedManyWithoutCreatedByInputObjectSchema
      )
      .optional(),
  })
  .strict()

export const ProfileUncheckedCreateWithoutUserInputObjectSchema = Schema
