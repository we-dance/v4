import { z } from 'zod'
import { ProfileCreateNestedOneWithoutStylesInputObjectSchema } from './ProfileCreateNestedOneWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateWithoutStyleInput> = z
  .object({
    level: z.string(),
    highlighted: z.boolean(),
    profile: z.lazy(() => ProfileCreateNestedOneWithoutStylesInputObjectSchema),
  })
  .strict()

export const ExperienceCreateWithoutStyleInputObjectSchema = Schema
