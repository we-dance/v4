import { z } from 'zod'
import { ExperienceCreateWithoutStyleInputObjectSchema } from './ExperienceCreateWithoutStyleInput.schema'
import { ExperienceUncheckedCreateWithoutStyleInputObjectSchema } from './ExperienceUncheckedCreateWithoutStyleInput.schema'
import { ExperienceCreateOrConnectWithoutStyleInputObjectSchema } from './ExperienceCreateOrConnectWithoutStyleInput.schema'
import { ExperienceUpsertWithWhereUniqueWithoutStyleInputObjectSchema } from './ExperienceUpsertWithWhereUniqueWithoutStyleInput.schema'
import { ExperienceCreateManyStyleInputEnvelopeObjectSchema } from './ExperienceCreateManyStyleInputEnvelope.schema'
import { ExperienceWhereUniqueInputObjectSchema } from './ExperienceWhereUniqueInput.schema'
import { ExperienceUpdateWithWhereUniqueWithoutStyleInputObjectSchema } from './ExperienceUpdateWithWhereUniqueWithoutStyleInput.schema'
import { ExperienceUpdateManyWithWhereWithoutStyleInputObjectSchema } from './ExperienceUpdateManyWithWhereWithoutStyleInput.schema'
import { ExperienceScalarWhereInputObjectSchema } from './ExperienceScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ExperienceUncheckedUpdateManyWithoutStyleNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () => ExperienceUpsertWithWhereUniqueWithoutStyleInputObjectSchema
          ),
          z
            .lazy(
              () => ExperienceUpsertWithWhereUniqueWithoutStyleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ExperienceCreateManyStyleInputEnvelopeObjectSchema)
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
            () => ExperienceUpdateWithWhereUniqueWithoutStyleInputObjectSchema
          ),
          z
            .lazy(
              () => ExperienceUpdateWithWhereUniqueWithoutStyleInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ExperienceUpdateManyWithWhereWithoutStyleInputObjectSchema
          ),
          z
            .lazy(
              () => ExperienceUpdateManyWithWhereWithoutStyleInputObjectSchema
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

export const ExperienceUncheckedUpdateManyWithoutStyleNestedInputObjectSchema =
  Schema
