import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutCityInputObjectSchema } from './ProfileUpdateWithoutCityInput.schema'
import { ProfileUncheckedUpdateWithoutCityInputObjectSchema } from './ProfileUncheckedUpdateWithoutCityInput.schema'
import { ProfileCreateWithoutCityInputObjectSchema } from './ProfileCreateWithoutCityInput.schema'
import { ProfileUncheckedCreateWithoutCityInputObjectSchema } from './ProfileUncheckedCreateWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpsertWithWhereUniqueWithoutCityInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ProfileUpdateWithoutCityInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutCityInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutCityInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutCityInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpsertWithWhereUniqueWithoutCityInputObjectSchema = Schema
