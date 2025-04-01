import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { DanceStyleListRelationFilterObjectSchema } from './DanceStyleListRelationFilter.schema'
import { ProfileRelationFilterObjectSchema } from './ProfileRelationFilter.schema'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'
import { PostListRelationFilterObjectSchema } from './PostListRelationFilter.schema'
import { GuestListRelationFilterObjectSchema } from './GuestListRelationFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EventWhereInputObjectSchema),
        z.lazy(() => EventWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EventWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EventWhereInputObjectSchema),
        z.lazy(() => EventWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    shortId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slug: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    startDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    endDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    type: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    cover: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    price: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    firebaseId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    published: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    creatorId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    organizerId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    venueId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    styles: z.lazy(() => DanceStyleListRelationFilterObjectSchema).optional(),
    creator: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional(),
    organizer: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional(),
    venue: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional(),
    posts: z.lazy(() => PostListRelationFilterObjectSchema).optional(),
    guests: z.lazy(() => GuestListRelationFilterObjectSchema).optional(),
  })
  .strict()

export const EventWhereInputObjectSchema = Schema
