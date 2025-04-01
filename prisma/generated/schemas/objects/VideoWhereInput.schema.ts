import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DanceStyleRelationFilterObjectSchema } from './DanceStyleRelationFilter.schema'
import { DanceStyleWhereInputObjectSchema } from './DanceStyleWhereInput.schema'
import { ProfileRelationFilterObjectSchema } from './ProfileRelationFilter.schema'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.VideoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => VideoWhereInputObjectSchema),
        z.lazy(() => VideoWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VideoWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VideoWhereInputObjectSchema),
        z.lazy(() => VideoWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    url: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    styleId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    createdById: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    style: z
      .union([
        z.lazy(() => DanceStyleRelationFilterObjectSchema),
        z.lazy(() => DanceStyleWhereInputObjectSchema),
      ])
      .optional(),
    createdBy: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict()

export const VideoWhereInputObjectSchema = Schema
