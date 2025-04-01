import { z } from 'zod'
import { ProfileCreateWithoutCreatedByInputObjectSchema } from './ProfileCreateWithoutCreatedByInput.schema'
import { ProfileUncheckedCreateWithoutCreatedByInputObjectSchema } from './ProfileUncheckedCreateWithoutCreatedByInput.schema'
import { ProfileCreateOrConnectWithoutCreatedByInputObjectSchema } from './ProfileCreateOrConnectWithoutCreatedByInput.schema'
import { ProfileCreateManyCreatedByInputEnvelopeObjectSchema } from './ProfileCreateManyCreatedByInputEnvelope.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedManyWithoutCreatedByInput> = z
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
    createMany: z
      .lazy(() => ProfileCreateManyCreatedByInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const ProfileCreateNestedManyWithoutCreatedByInputObjectSchema = Schema
