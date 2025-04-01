import { z } from 'zod'
import { ProfileFollowerCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateWithoutFollowerInput.schema'
import { ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutFollowerInput.schema'
import { ProfileFollowerCreateOrConnectWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateOrConnectWithoutFollowerInput.schema'
import { ProfileFollowerUpsertWithWhereUniqueWithoutFollowerInputObjectSchema } from './ProfileFollowerUpsertWithWhereUniqueWithoutFollowerInput.schema'
import { ProfileFollowerCreateManyFollowerInputEnvelopeObjectSchema } from './ProfileFollowerCreateManyFollowerInputEnvelope.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerUpdateWithWhereUniqueWithoutFollowerInputObjectSchema } from './ProfileFollowerUpdateWithWhereUniqueWithoutFollowerInput.schema'
import { ProfileFollowerUpdateManyWithWhereWithoutFollowerInputObjectSchema } from './ProfileFollowerUpdateManyWithWhereWithoutFollowerInput.schema'
import { ProfileFollowerScalarWhereInputObjectSchema } from './ProfileFollowerScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateManyWithoutFollowerNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileFollowerCreateWithoutFollowerInputObjectSchema),
          z
            .lazy(() => ProfileFollowerCreateWithoutFollowerInputObjectSchema)
            .array(),
          z.lazy(
            () => ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ProfileFollowerCreateOrConnectWithoutFollowerInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerCreateOrConnectWithoutFollowerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ProfileFollowerUpsertWithWhereUniqueWithoutFollowerInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUpsertWithWhereUniqueWithoutFollowerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ProfileFollowerCreateManyFollowerInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ProfileFollowerUpdateWithWhereUniqueWithoutFollowerInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUpdateWithWhereUniqueWithoutFollowerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ProfileFollowerUpdateManyWithWhereWithoutFollowerInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUpdateManyWithWhereWithoutFollowerInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema),
          z.lazy(() => ProfileFollowerScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ProfileFollowerUpdateManyWithoutFollowerNestedInputObjectSchema =
  Schema
