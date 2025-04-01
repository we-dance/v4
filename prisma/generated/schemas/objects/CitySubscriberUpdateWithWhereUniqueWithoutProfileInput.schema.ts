import { z } from 'zod'
import { CitySubscriberWhereUniqueInputObjectSchema } from './CitySubscriberWhereUniqueInput.schema'
import { CitySubscriberUpdateWithoutProfileInputObjectSchema } from './CitySubscriberUpdateWithoutProfileInput.schema'
import { CitySubscriberUncheckedUpdateWithoutProfileInputObjectSchema } from './CitySubscriberUncheckedUpdateWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateWithWhereUniqueWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CitySubscriberUpdateWithoutProfileInputObjectSchema),
        z.lazy(
          () => CitySubscriberUncheckedUpdateWithoutProfileInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CitySubscriberUpdateWithWhereUniqueWithoutProfileInputObjectSchema =
  Schema
