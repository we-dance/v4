import { z } from 'zod'
import { ProfileCreateWithoutCreatedByInputObjectSchema } from './ProfileCreateWithoutCreatedByInput.schema'
import { ProfileUncheckedCreateWithoutCreatedByInputObjectSchema } from './ProfileUncheckedCreateWithoutCreatedByInput.schema'
import { ProfileCreateOrConnectWithoutCreatedByInputObjectSchema } from './ProfileCreateOrConnectWithoutCreatedByInput.schema'
import { ProfileUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema } from './ProfileUpsertWithWhereUniqueWithoutCreatedByInput.schema'
import { ProfileCreateManyCreatedByInputEnvelopeObjectSchema } from './ProfileCreateManyCreatedByInputEnvelope.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema } from './ProfileUpdateWithWhereUniqueWithoutCreatedByInput.schema'
import { ProfileUpdateManyWithWhereWithoutCreatedByInputObjectSchema } from './ProfileUpdateManyWithWhereWithoutCreatedByInput.schema'
import { ProfileScalarWhereInputObjectSchema } from './ProfileScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateManyWithoutCreatedByNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutCreatedByInputObjectSchema),
        z.lazy(() => ProfileCreateWithoutCreatedByInputObjectSchema).array(),
        z.lazy(() => ProfileUncheckedCreateWithoutCreatedByInputObjectSchema),
        z
          .lazy(() => ProfileUncheckedCreateWithoutCreatedByInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProfileCreateOrConnectWithoutCreatedByInputObjectSchema),
        z
          .lazy(() => ProfileCreateOrConnectWithoutCreatedByInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => ProfileUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => ProfileUpsertWithWhereUniqueWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ProfileCreateManyCreatedByInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => ProfileUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => ProfileUpdateWithWhereUniqueWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => ProfileUpdateManyWithWhereWithoutCreatedByInputObjectSchema
        ),
        z
          .lazy(
            () => ProfileUpdateManyWithWhereWithoutCreatedByInputObjectSchema
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ProfileScalarWhereInputObjectSchema),
        z.lazy(() => ProfileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const ProfileUpdateManyWithoutCreatedByNestedInputObjectSchema = Schema
