import { z } from 'zod'
import { CityScalarWhereInputObjectSchema } from './CityScalarWhereInput.schema'
import { CityUpdateManyMutationInputObjectSchema } from './CityUpdateManyMutationInput.schema'
import { CityUncheckedUpdateManyWithoutCitiesInputObjectSchema } from './CityUncheckedUpdateManyWithoutCitiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpdateManyWithWhereWithoutCountryInput> = z
  .object({
    where: z.lazy(() => CityScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => CityUpdateManyMutationInputObjectSchema),
      z.lazy(() => CityUncheckedUpdateManyWithoutCitiesInputObjectSchema),
    ]),
  })
  .strict()

export const CityUpdateManyWithWhereWithoutCountryInputObjectSchema = Schema
