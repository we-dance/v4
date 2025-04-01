import { z } from 'zod'
import { ProfileFollowerCreateWithoutProfileInputObjectSchema } from './ProfileFollowerCreateWithoutProfileInput.schema'
import { ProfileFollowerUncheckedCreateWithoutProfileInputObjectSchema } from './ProfileFollowerUncheckedCreateWithoutProfileInput.schema'
import { ProfileFollowerCreateOrConnectWithoutProfileInputObjectSchema } from './ProfileFollowerCreateOrConnectWithoutProfileInput.schema'
import { ProfileFollowerCreateManyProfileInputEnvelopeObjectSchema } from './ProfileFollowerCreateManyProfileInputEnvelope.schema'
import { ProfileFollowerWhereUniqueInputObjectSchema } from './ProfileFollowerWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileFollowerUncheckedCreateNestedManyWithoutProfileInput> =
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
      createMany: z
        .lazy(() => ProfileFollowerCreateManyProfileInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema),
          z.lazy(() => ProfileFollowerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const ProfileFollowerUncheckedCreateNestedManyWithoutProfileInputObjectSchema =
  Schema
