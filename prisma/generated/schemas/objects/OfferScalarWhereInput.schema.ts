import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => OfferScalarWhereInputObjectSchema),
        z.lazy(() => OfferScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => OfferScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => OfferScalarWhereInputObjectSchema),
        z.lazy(() => OfferScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    price: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    currency: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    duration: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    validFrom: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    validThrough: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    courseId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    items: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()

export const OfferScalarWhereInputObjectSchema = Schema
