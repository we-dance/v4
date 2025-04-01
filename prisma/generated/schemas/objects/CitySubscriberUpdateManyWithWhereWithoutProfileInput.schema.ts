import { z } from 'zod'
import { CitySubscriberScalarWhereInputObjectSchema } from './CitySubscriberScalarWhereInput.schema'
import { CitySubscriberUpdateManyMutationInputObjectSchema } from './CitySubscriberUpdateManyMutationInput.schema'
import { CitySubscriberUncheckedUpdateManyWithoutCitiesInputObjectSchema } from './CitySubscriberUncheckedUpdateManyWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberUpdateManyWithWhereWithoutProfileInput> =
  z
    .object({
      where: z.lazy(() => CitySubscriberScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CitySubscriberUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CitySubscriberUncheckedUpdateManyWithoutCitiesInputObjectSchema
        ),
      ]),
    })
    .strict()

export const CitySubscriberUpdateManyWithWhereWithoutProfileInputObjectSchema =
  Schema
