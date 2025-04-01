import { z } from 'zod'
import { ProfileCreateWithoutCityInputObjectSchema } from './ProfileCreateWithoutCityInput.schema'
import { ProfileUncheckedCreateWithoutCityInputObjectSchema } from './ProfileUncheckedCreateWithoutCityInput.schema'
import { ProfileCreateOrConnectWithoutCityInputObjectSchema } from './ProfileCreateOrConnectWithoutCityInput.schema'
import { ProfileUpsertWithWhereUniqueWithoutCityInputObjectSchema } from './ProfileUpsertWithWhereUniqueWithoutCityInput.schema'
import { ProfileCreateManyCityInputEnvelopeObjectSchema } from './ProfileCreateManyCityInputEnvelope.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithWhereUniqueWithoutCityInputObjectSchema } from './ProfileUpdateWithWhereUniqueWithoutCityInput.schema'
import { ProfileUpdateManyWithWhereWithoutCityInputObjectSchema } from './ProfileUpdateManyWithWhereWithoutCityInput.schema'
import { ProfileScalarWhereInputObjectSchema } from './ProfileScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateManyWithoutCityNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutCityInputObjectSchema),
        z.lazy(() => ProfileCreateWithoutCityInputObjectSchema).array(),
        z.lazy(() => ProfileUncheckedCreateWithoutCityInputObjectSchema),
        z
          .lazy(() => ProfileUncheckedCreateWithoutCityInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProfileCreateOrConnectWithoutCityInputObjectSchema),
        z
          .lazy(() => ProfileCreateOrConnectWithoutCityInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ProfileUpsertWithWhereUniqueWithoutCityInputObjectSchema),
        z
          .lazy(() => ProfileUpsertWithWhereUniqueWithoutCityInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ProfileCreateManyCityInputEnvelopeObjectSchema)
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
        z.lazy(() => ProfileUpdateWithWhereUniqueWithoutCityInputObjectSchema),
        z
          .lazy(() => ProfileUpdateWithWhereUniqueWithoutCityInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ProfileUpdateManyWithWhereWithoutCityInputObjectSchema),
        z
          .lazy(() => ProfileUpdateManyWithWhereWithoutCityInputObjectSchema)
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

export const ProfileUpdateManyWithoutCityNestedInputObjectSchema = Schema
