import { z } from 'zod'
import { ExperienceProfileIdStyleIdCompoundUniqueInputObjectSchema } from './ExperienceProfileIdStyleIdCompoundUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceWhereUniqueInput> = z
  .object({
    profileId_styleId: z
      .lazy(() => ExperienceProfileIdStyleIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict()

export const ExperienceWhereUniqueInputObjectSchema = Schema
