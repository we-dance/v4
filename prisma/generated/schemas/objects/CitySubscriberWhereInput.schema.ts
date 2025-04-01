import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { CityRelationFilterObjectSchema } from './CityRelationFilter.schema'
import { CityWhereInputObjectSchema } from './CityWhereInput.schema'
import { ProfileRelationFilterObjectSchema } from './ProfileRelationFilter.schema'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CitySubscriberWhereInputObjectSchema),
        z.lazy(() => CitySubscriberWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CitySubscriberWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CitySubscriberWhereInputObjectSchema),
        z.lazy(() => CitySubscriberWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    cityId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    profileId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    city: z
      .union([
        z.lazy(() => CityRelationFilterObjectSchema),
        z.lazy(() => CityWhereInputObjectSchema),
      ])
      .optional(),
    profile: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const CitySubscriberWhereInputObjectSchema = Schema
