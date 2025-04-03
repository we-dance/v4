import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './ProfileWhereUniqueInput.schema'
import { ProfileCreateWithoutCitiesInputObjectSchema } from './ProfileCreateWithoutCitiesInput.schema'
import { ProfileUncheckedCreateWithoutCitiesInputObjectSchema } from './ProfileUncheckedCreateWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutCitiesInput> = z
  .object({
    where: z.lazy(() => ProfileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ProfileCreateWithoutCitiesInputObjectSchema),
      z.lazy(() => ProfileUncheckedCreateWithoutCitiesInputObjectSchema),
    ]),
  })
  .strict()

export const ProfileCreateOrConnectWithoutCitiesInputObjectSchema = Schema
