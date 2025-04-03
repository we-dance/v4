import { z } from 'zod'
import { ProfileFollowerCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateWithoutFollowerInput.schema'
import { ProfileFollowerUncheckedCreateWithoutFollowerInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutFollowerInput.schema'
import { ProfileFollowerCreateOrConnectWithoutFollowerInputObjectSchema } from './ProfileFollowerCreateOrConnectWithoutFollowerInput.schema'
import { ProfileFollowerCreateManyFollowerInputEnvelopeObjectSchema } from './ProfileFollowerCreateManyFollowerInputEnvelope.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerCreateNestedManyWithoutFollowerInput> =
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
      createMany: z
        .lazy(() => ProfileFollowerCreateManyFollowerInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ProfileFollowerCreateNestedManyWithoutFollowerInputObjectSchema =
  Schema
