import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileUpdateWithoutCityInputObjectSchema } from './ProfileUpdateWithoutCityInput.schema'
import { ProfileUncheckedUpdateWithoutCityInputObjectSchema } from './ProfileUncheckedUpdateWithoutCityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUpdateWithWhereUniqueWithoutCityInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ProfileUpdateWithoutCityInputObjectSchema),
      z.lazy(() => ProfileUncheckedUpdateWithoutCityInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileUpdateWithWhereUniqueWithoutCityInputObjectSchema = Schema
