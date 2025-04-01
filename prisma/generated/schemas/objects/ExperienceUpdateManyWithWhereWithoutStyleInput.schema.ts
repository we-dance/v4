import { z } from 'zod'
import { ExperienceScalarWhereInputObjectSchema } from './ExperienceScalarWhereInput.schema'
import { ExperienceUpdateManyMutationInputObjectSchema } from './ExperienceUpdateManyMutationInput.schema'
import { ExperienceUncheckedUpdateManyWithoutExperiencesInputObjectSchema } from './ExperienceUncheckedUpdateManyWithoutExperiencesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateManyWithWhereWithoutStyleInput> =
  z
    .object({
      where: z.lazy(() => ExperienceScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ExperienceUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => ExperienceUncheckedUpdateManyWithoutExperiencesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ExperienceUpdateManyWithWhereWithoutStyleInputObjectSchema = Schema
