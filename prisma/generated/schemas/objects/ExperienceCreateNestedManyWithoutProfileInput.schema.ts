import { z } from 'zod'
import { ExperienceCreateWithoutProfileInputObjectSchema } from './ExperienceCreateWithoutProfileInput.schema'
import { ExperienceUncheckedCreateWithoutProfileInputObjectSchema } from './ExperienceUncheckedCreateWithoutProfileInput.schema'
import { ExperienceCreateOrConnectWithoutProfileInputObjectSchema } from './ExperienceCreateOrConnectWithoutProfileInput.schema'
import { ExperienceCreateManyProfileInputEnvelopeObjectSchema } from './ExperienceCreateManyProfileInputEnvelope.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceCreateNestedManyWithoutProfileInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ExperienceCreateWithoutProfileInputObjectSchema),
          z.lazy(() => ExperienceCreateWithoutProfileInputObjectSchema).array(),
          z.lazy(
            () => ExperienceUncheckedCreateWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () => ExperienceUncheckedCreateWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ExperienceCreateOrConnectWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () => ExperienceCreateOrConnectWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExperienceCreateManyProfileInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ExperienceCreateNestedManyWithoutProfileInputObjectSchema = Schema
