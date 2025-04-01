import { z } from 'zod'
import { ProfileCreateNestedOneWithoutStylesInputObjectSchema } from './ProfileCreateNestedOneWithoutStylesInput.schema'
import { DanceStyleCreateNestedOneWithoutExperiencesInputObjectSchema } from './DanceStyleCreateNestedOneWithoutExperiencesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateInput> = z
  .object({
    level: z.string(),
    highlighted: z.boolean(),
    profile: z.lazy(() => ProfileCreateNestedOneWithoutStylesInputObjectSchema),
    style: z.lazy(
      () => DanceStyleCreateNestedOneWithoutExperiencesInputObjectSchema
    ),
  })
  .strict()

export const ExperienceCreateInputObjectSchema = Schema
