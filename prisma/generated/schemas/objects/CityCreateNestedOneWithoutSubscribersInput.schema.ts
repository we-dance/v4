import { z } from 'zod'
import { CityCreateWithoutSubscribersInputObjectSchema } from './CityCreateWithoutSubscribersInput.schema'
import { CityUncheckedCreateWithoutSubscribersInputObjectSchema } from './CityUncheckedCreateWithoutSubscribersInput.schema'
import { CityCreateOrConnectWithoutSubscribersInputObjectSchema } from './CityCreateOrConnectWithoutSubscribersInput.schema'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateNestedOneWithoutSubscribersInput> = z
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
    connect: z.lazy(() => CityWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const CityCreateNestedOneWithoutSubscribersInputObjectSchema = Schema
