import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema'
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema'
import { BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProfileScalarWhereInputObjectSchema),
        z.lazy(() => ProfileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProfileScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProfileScalarWhereInputObjectSchema),
        z.lazy(() => ProfileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    username: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    firebaseUsername: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    pronounce: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    bio: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    story: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    firebaseId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    claimed: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    formattedAddress: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    mapUrl: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    lng: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    lat: z
      .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    placeId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    type: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    photo: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    website: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    instagram: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    facebook: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    phone: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    youtube: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    spotify: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    tiktok: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    linkedin: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    whatsapp: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    threads: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    twitter: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    vk: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    telegram: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    couchsurfing: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    airbnb: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    blablacar: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdById: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    lastLoginAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    isDeleted: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    deletedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    deletedReason: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    followersCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    followingCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    viewsCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    visibility: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    timezone: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    locales: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    gender: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    birthday: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    objectives: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    step: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    invitedBy: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    daysUsed: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    pwaUsed: z
      .union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()])
      .optional()
      .nullable(),
    oldCities: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    privacySettings: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    userId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    cityId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()

export const ProfileScalarWhereInputObjectSchema = Schema
