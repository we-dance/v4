import { z } from 'zod'
import { CityCreateWithoutSubscribersInputObjectSchema } from './CityCreateWithoutSubscribersInput.schema'
import { CityUncheckedCreateWithoutSubscribersInputObjectSchema } from './CityUncheckedCreateWithoutSubscribersInput.schema'
import { CityCreateOrConnectWithoutSubscribersInputObjectSchema } from './CityCreateOrConnectWithoutSubscribersInput.schema'
import { CityUpsertWithoutSubscribersInputObjectSchema } from './CityUpsertWithoutSubscribersInput.schema'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityUpdateWithoutSubscribersInputObjectSchema } from './CityUpdateWithoutSubscribersInput.schema'
import { CityUncheckedUpdateWithoutSubscribersInputObjectSchema } from './CityUncheckedUpdateWithoutSubscribersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpdateOneRequiredWithoutSubscribersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CityCreateWithoutSubscribersInputObjectSchema),
          z.lazy(() => CityUncheckedCreateWithoutSubscribersInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CityCreateOrConnectWithoutSubscribersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => CityUpsertWithoutSubscribersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CityWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => CityUpdateWithoutSubscribersInputObjectSchema),
          z.lazy(() => CityUncheckedUpdateWithoutSubscribersInputObjectSchema),
        ])
        .optional(),
    })
    .strict()

export const CityUpdateOneRequiredWithoutSubscribersNestedInputObjectSchema =
  Schema
