import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema),
        z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProfileFollowerScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema),
        z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    followerId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    profileId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()

export const ProfileFollowerScalarWhereInputObjectSchema = Schema
