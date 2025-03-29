import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ExperienceScalarWhereInputObjectSchema),
        z.lazy(() => ExperienceScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ExperienceScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ExperienceScalarWhereInputObjectSchema),
        z.lazy(() => ExperienceScalarWhereInputObjectSchema).array(),
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
  })
  .strict()

export const ExperienceScalarWhereInputObjectSchema = Schema
