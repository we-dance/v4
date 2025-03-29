import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.RedirectWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RedirectWhereInputObjectSchema),
        z.lazy(() => RedirectWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RedirectWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RedirectWhereInputObjectSchema),
        z.lazy(() => RedirectWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    from: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    to: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    note: z
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

export const RedirectWhereInputObjectSchema = Schema
