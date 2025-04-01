import { z } from 'zod'
import { CitySubscriberScalarWhereInputObjectSchema } from './CitySubscriberScalarWhereInput.schema'
import { CitySubscriberUpdateManyMutationInputObjectSchema } from './CitySubscriberUpdateManyMutationInput.schema'
import { CitySubscriberUncheckedUpdateManyWithoutSubscribersInputObjectSchema } from './CitySubscriberUncheckedUpdateManyWithoutSubscribersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateManyWithWhereWithoutCityInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CitySubscriberUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CitySubscriberUncheckedUpdateManyWithoutSubscribersInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CitySubscriberUpdateManyWithWhereWithoutCityInputObjectSchema =
  Schema
