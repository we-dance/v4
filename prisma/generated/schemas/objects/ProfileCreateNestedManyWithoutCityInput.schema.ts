import { z } from 'zod'
import { ProfileCreateWithoutCityInputObjectSchema } from './ProfileCreateWithoutCityInput.schema'
import { ProfileUncheckedCreateWithoutCityInputObjectSchema } from './ProfileUncheckedCreateWithoutCityInput.schema'
import { ProfileCreateOrConnectWithoutCityInputObjectSchema } from './ProfileCreateOrConnectWithoutCityInput.schema'
import { ProfileCreateManyCityInputEnvelopeObjectSchema } from './ProfileCreateManyCityInputEnvelope.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedManyWithoutCityInput> = z
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
    createMany: z
      .lazy(() => ProfileCreateManyCityInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ProfileWhereUniqueInputObjectSchema),
        z.lazy(() => ProfileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const ProfileCreateNestedManyWithoutCityInputObjectSchema = Schema
