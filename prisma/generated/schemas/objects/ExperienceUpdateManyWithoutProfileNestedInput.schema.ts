import { z } from 'zod'
import { ExperienceCreateWithoutProfileInputObjectSchema } from './ExperienceCreateWithoutProfileInput.schema'
import { ExperienceUncheckedCreateWithoutProfileInputObjectSchema } from './ExperienceUncheckedCreateWithoutProfileInput.schema'
import { ExperienceCreateOrConnectWithoutProfileInputObjectSchema } from './ExperienceCreateOrConnectWithoutProfileInput.schema'
import { ExperienceUpsertWithWhereUniqueWithoutProfileInputObjectSchema } from './ExperienceUpsertWithWhereUniqueWithoutProfileInput.schema'
import { ExperienceCreateManyProfileInputEnvelopeObjectSchema } from './ExperienceCreateManyProfileInputEnvelope.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceUpdateWithWhereUniqueWithoutProfileInputObjectSchema } from './ExperienceUpdateWithWhereUniqueWithoutProfileInput.schema'
import { ExperienceUpdateManyWithWhereWithoutProfileInputObjectSchema } from './ExperienceUpdateManyWithWhereWithoutProfileInput.schema'
import { ExperienceScalarWhereInputObjectSchema } from './ExperienceScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUpdateManyWithoutProfileNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () => ExperienceUpsertWithWhereUniqueWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ExperienceUpsertWithWhereUniqueWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExperienceCreateManyProfileInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema),
          z.lazy(() => ExperienceWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ExperienceUpdateWithWhereUniqueWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ExperienceUpdateWithWhereUniqueWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ExperienceUpdateManyWithWhereWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () => ExperienceUpdateManyWithWhereWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ExperienceScalarWhereInputObjectSchema),
          z.lazy(() => ExperienceScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ExperienceUpdateManyWithoutProfileNestedInputObjectSchema = Schema
