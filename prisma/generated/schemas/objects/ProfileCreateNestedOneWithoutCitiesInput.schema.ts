import { z } from 'zod'
import { ProfileCreateWithoutCitiesInputObjectSchema } from './ProfileCreateWithoutCitiesInput.schema'
import { ProfileUncheckedCreateWithoutCitiesInputObjectSchema } from './ProfileUncheckedCreateWithoutCitiesInput.schema'
import { ProfileCreateOrConnectWithoutCitiesInputObjectSchema } from './ProfileCreateOrConnectWithoutCitiesInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutCitiesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProfileCreateWithoutCitiesInputObjectSchema),
        z.lazy(() => ProfileUncheckedCreateWithoutCitiesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => ProfileCreateOrConnectWithoutCitiesInputObjectSchema)
      .optional(),
    connect: z.lazy(() => ProfileWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const ProfileCreateNestedOneWithoutCitiesInputObjectSchema = Schema
