import { z } from 'zod'
import { ExperienceScalarWhereInputObjectSchema } from './ExperienceScalarWhereInput.schema'
import { ExperienceUpdateManyMutationInputObjectSchema } from './ExperienceUpdateManyMutationInput.schema'
import { ExperienceUncheckedUpdateManyWithoutStylesInputObjectSchema } from './ExperienceUncheckedUpdateManyWithoutStylesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateManyWithWhereWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => ExperienceScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ExperienceUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => ExperienceUncheckedUpdateManyWithoutStylesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const ExperienceUpdateManyWithWhereWithoutProfileInputObjectSchema =
  Schema
