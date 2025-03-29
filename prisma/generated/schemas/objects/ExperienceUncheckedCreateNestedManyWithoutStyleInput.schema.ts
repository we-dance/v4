import { z } from 'zod'
import { ExperienceCreateWithoutStyleInputObjectSchema } from './ExperienceCreateWithoutStyleInput.schema'
import { ExperienceUncheckedCreateWithoutStyleInputObjectSchema } from './ExperienceUncheckedCreateWithoutStyleInput.schema'
import { ExperienceCreateOrConnectWithoutStyleInputObjectSchema } from './ExperienceCreateOrConnectWithoutStyleInput.schema'
import { ExperienceCreateManyStyleInputEnvelopeObjectSchema } from './ExperienceCreateManyStyleInputEnvelope.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUncheckedCreateNestedManyWithoutStyleInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ExperienceCreateWithoutStyleInputObjectSchema),
          z.lazy(() => ExperienceCreateWithoutStyleInputObjectSchema).array(),
          z.lazy(() => ExperienceUncheckedCreateWithoutStyleInputObjectSchema),
          z
            .lazy(() => ExperienceUncheckedCreateWithoutStyleInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ExperienceCreateOrConnectWithoutStyleInputObjectSchema),
          z
            .lazy(() => ExperienceCreateOrConnectWithoutStyleInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExperienceCreateManyStyleInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ExperienceUncheckedCreateNestedManyWithoutStyleInputObjectSchema =
  Schema
