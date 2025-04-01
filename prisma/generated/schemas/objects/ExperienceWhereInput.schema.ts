import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { ProfileRelationFilterObjectSchema } from './ProfileRelationFilter.schema'
import { ProfileWhereInputObjectSchema } from './ProfileWhereInput.schema'
import { DanceStyleRelationFilterObjectSchema } from './DanceStyleRelationFilter.schema'
import { DanceStyleWhereInputObjectSchema } from './DanceStyleWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ExperienceWhereInputObjectSchema),
        z.lazy(() => ExperienceWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ExperienceWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ExperienceWhereInputObjectSchema),
        z.lazy(() => ExperienceWhereInputObjectSchema).array(),
      ])
      .optional(),
    level: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    highlighted: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    profileId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    styleId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    profile: z
      .union([
        z.lazy(() => ProfileRelationFilterObjectSchema),
        z.lazy(() => ProfileWhereInputObjectSchema),
      ])
      .optional(),
    style: z
      .union([
        z.lazy(() => DanceStyleRelationFilterObjectSchema),
        z.lazy(() => DanceStyleWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const ExperienceWhereInputObjectSchema = Schema
