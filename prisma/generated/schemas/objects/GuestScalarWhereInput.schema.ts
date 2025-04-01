import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => GuestScalarWhereInputObjectSchema),
        z.lazy(() => GuestScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => GuestScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => GuestScalarWhereInputObjectSchema),
        z.lazy(() => GuestScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    profileId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    eventId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    role: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    status: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    invitedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    confirmedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    cancelledAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    registeredAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    waitlistedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
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

export const GuestScalarWhereInputObjectSchema = Schema
