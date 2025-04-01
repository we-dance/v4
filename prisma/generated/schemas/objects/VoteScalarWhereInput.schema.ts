import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VoteScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VoteScalarWhereInputObjectSchema),
        z.lazy(() => VoteScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VoteScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VoteScalarWhereInputObjectSchema),
        z.lazy(() => VoteScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    winnerId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    loserId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    createdById: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict()

export const VoteScalarWhereInputObjectSchema = Schema
