import { z } from 'zod'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityCreateWithoutProfilesInputObjectSchema } from './CityCreateWithoutProfilesInput.schema'
import { CityUncheckedCreateWithoutProfilesInputObjectSchema } from './CityUncheckedCreateWithoutProfilesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateOrConnectWithoutProfilesInput> = z
  .object({
    where: z.lazy(() => CityWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CityCreateWithoutProfilesInputObjectSchema),
      z.lazy(() => CityUncheckedCreateWithoutProfilesInputObjectSchema),
    ]),
  })
  .strict()

export const CityCreateOrConnectWithoutProfilesInputObjectSchema = Schema
