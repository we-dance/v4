import { z } from 'zod'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberUpdateWithoutProfileInputObjectSchema } from './CitySubscriberUpdateWithoutProfileInput.schema'
import { CitySubscriberUncheckedUpdateWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedUpdateWithoutProfileInput.schema'
import { CitySubscriberCreateWithoutProfileInputObjectSchema } from './CitySubscriberCreateWithoutProfileInput.schema'
import { CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedCreateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpsertWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CitySubscriberUpdateWithoutProfileInputObjectSchema),
        z.lazy(
          () => CitySubscriberUncheckedUpdateWithoutProfileInputObjectSchema
        ),
      ]),
      create: z.union([
        z.lazy(() => CitySubscriberCreateWithoutProfileInputObjectSchema),
        z.lazy(
          () => CitySubscriberUncheckedCreateWithoutProfileInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CitySubscriberUpsertWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema
