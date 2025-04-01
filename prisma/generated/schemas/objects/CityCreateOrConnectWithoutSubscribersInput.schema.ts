import { z } from 'zod'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityCreateWithoutSubscribersInputObjectSchema } from './CityCreateWithoutSubscribersInput.schema'
import { CityUncheckedCreateWithoutSubscribersInputObjectSchema } from './CityUncheckedCreateWithoutSubscribersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateOrConnectWithoutSubscribersInput> = z
  .object({
    where: z.lazy(() => CityWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CityCreateWithoutSubscribersInputObjectSchema),
      z.lazy(() => CityUncheckedCreateWithoutSubscribersInputObjectSchema),
    ]),
  })
  .strict()

export const CityCreateOrConnectWithoutSubscribersInputObjectSchema = Schema
