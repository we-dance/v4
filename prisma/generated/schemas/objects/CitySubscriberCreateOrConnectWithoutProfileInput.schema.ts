import { z } from 'zod'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberCreateWithoutProfileInputObjectSchema } from './CitySubscriberCreateWithoutProfileInput.schema'
import { CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateOrConnectWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CitySubscriberCreateWithoutProfileInputObjectSchema),
        z.lazy(
          () => CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CitySubscriberCreateOrConnectWithoutProfileInputObjectSchema =
  Schema
