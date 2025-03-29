import { z } from 'zod'
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import type { Prisma } from '@prisma/client'

const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonSchema.nullable()),
    z.record(jsonSchema.nullable()),
  ])
)

const Schema: z.ZodType<Prisma.OfferUncheckedCreateWithoutCourseInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number(),
    currency: z.string(),
    duration: z.string(),
    validFrom: z.coerce.date().optional().nullable(),
    validThrough: z.coerce.date().optional().nullable(),
    items: z
      .union([z.lazy(() => NullableJsonNullValueInputSchema), jsonSchema])
      .optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict()

export const OfferUncheckedCreateWithoutCourseInputObjectSchema = Schema
