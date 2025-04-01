import { z } from 'zod'
import { CityUpdateWithoutSubscribersInputObjectSchema } from './CityUpdateWithoutSubscribersInput.schema'
import { CityUncheckedUpdateWithoutSubscribersInputObjectSchema } from './CityUncheckedUpdateWithoutSubscribersInput.schema'
import { CityCreateWithoutSubscribersInputObjectSchema } from './CityCreateWithoutSubscribersInput.schema'
import { CityUncheckedCreateWithoutSubscribersInputObjectSchema } from './CityUncheckedCreateWithoutSubscribersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpsertWithoutSubscribersInput> = z
  .object({
    update: z.union([
      z.lazy(() => CityUpdateWithoutSubscribersInputObjectSchema),
      z.lazy(() => CityUncheckedUpdateWithoutSubscribersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CityCreateWithoutSubscribersInputObjectSchema),
      z.lazy(() => CityUncheckedCreateWithoutSubscribersInputObjectSchema),
    ]),
  })
  .strict()

export const CityUpsertWithoutSubscribersInputObjectSchema = Schema
