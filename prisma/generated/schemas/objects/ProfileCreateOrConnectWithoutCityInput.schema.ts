import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutCityInputObjectSchema } from './ProfileCreateWithoutCityInput.schema'
import { ProfileUncheckedCreateWithoutCityInputObjectSchema } from './ProfileUncheckedCreateWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutCityInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutCityInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutCityInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutCityInputObjectSchema = Schema
