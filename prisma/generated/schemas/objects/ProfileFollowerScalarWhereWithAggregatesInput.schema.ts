import { z } from 'zod'
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(
            () => ProfileFollowerScalarWhereWithAggregatesInputObjectSchema
          ),
          z
            .lazy(
              () => ProfileFollowerScalarWhereWithAggregatesInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ProfileFollowerScalarWhereWithAggregatesInputObjectSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(
            () => ProfileFollowerScalarWhereWithAggregatesInputObjectSchema
          ),
          z
            .lazy(
              () => ProfileFollowerScalarWhereWithAggregatesInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
        .optional(),
      followerId: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      profileId: z
        .union([
          z.lazy(() => StringWithAggregatesFilterObjectSchema),
          z.string(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict()

export const ProfileFollowerScalarWhereWithAggregatesInputObjectSchema = Schema
