import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { FloatFilterObjectSchema } from './FloatFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CityScalarWhereInputObjectSchema),
        z.lazy(() => CityScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CityScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CityScalarWhereInputObjectSchema),
        z.lazy(() => CityScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    region: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    countryCode: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slug: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    lat: z
      .union([z.lazy(() => FloatFilterObjectSchema), z.number()])
      .optional(),
    lng: z
      .union([z.lazy(() => FloatFilterObjectSchema), z.number()])
      .optional(),
    membersCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    subscribersCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    viewsCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict()

export const CityScalarWhereInputObjectSchema = Schema
