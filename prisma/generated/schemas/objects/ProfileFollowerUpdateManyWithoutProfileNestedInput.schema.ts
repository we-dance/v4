import { z } from 'zod'
import { ProfileFollowerCreateWithoutProfileInputObjectSchema } from './ProfileFollowerCreateWithoutProfileInput.schema'
import { ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutProfileInput.schema'
import { ProfileFollowerCreateOrConnectWithoutProfileInputObjectSchema } from './ProfileFollowerCreateOrConnectWithoutProfileInput.schema'
import { ProfileFollowerUpsertWithWhereUniqueWithoutProfileInputObjectSchema } from './ProfileFollowerUpsertWithWhereUniqueWithoutProfileInput.schema'
import { ProfileFollowerCreateManyProfileInputEnvelopeObjectSchema } from './ProfileFollowerCreateManyProfileInputEnvelope.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'
import { ProfileFollowerUpdateWithWhereUniqueWithoutProfileInputObjectSchema } from './ProfileFollowerUpdateWithWhereUniqueWithoutProfileInput.schema'
import { ProfileFollowerUpdateManyWithWhereWithoutProfileInputObjectSchema } from './ProfileFollowerUpdateManyWithWhereWithoutProfileInput.schema'
import { ProfileFollowerScalarWhereInputObjectSchema } from './ProfileFollowerScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUpdateManyWithoutProfileNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProfileFollowerCreateWithoutProfileInputObjectSchema),
          z
            .lazy(() => ProfileFollowerCreateWithoutProfileInputObjectSchema)
            .array(),
          z.lazy(
            () => ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => ProfileFollowerCreateOrConnectWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerCreateOrConnectWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              ProfileFollowerUpsertWithWhereUniqueWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUpsertWithWhereUniqueWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ProfileFollowerCreateManyProfileInputEnvelopeObjectSchema)
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
              ProfileFollowerUpdateWithWhereUniqueWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUpdateWithWhereUniqueWithoutProfileInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ProfileFollowerUpdateManyWithWhereWithoutProfileInputObjectSchema
          ),
          z
            .lazy(
              () =>
                ProfileFollowerUpdateManyWithWhereWithoutProfileInputObjectSchema
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

export const ProfileFollowerUpdateManyWithoutProfileNestedInputObjectSchema =
  Schema
