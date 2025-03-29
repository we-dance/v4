import { z } from 'zod'
import { DanceStyleCreateNestedOneWithoutExperiencesInputObjectSchema } from './DanceStyleCreateNestedOneWithoutExperiencesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateWithoutProfileInput> = z
  .object({
    level: z.string(),
    highlighted: z.boolean(),
    style: z.lazy(
      () => DanceStyleCreateNestedOneWithoutExperiencesInputObjectSchema
    ),
  })
  .strict()

export const ExperienceCreateWithoutProfileInputObjectSchema = Schema
