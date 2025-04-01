import { z } from 'zod'
import { CityCreateWithoutCountryInputObjectSchema } from './CityCreateWithoutCountryInput.schema'
import { CityUncheckedCreateWithoutCountryInputObjectSchema } from './CityUncheckedCreateWithoutCountryInput.schema'
import { CityCreateOrConnectWithoutCountryInputObjectSchema } from './CityCreateOrConnectWithoutCountryInput.schema'
import { CityCreateManyCountryInputEnvelopeObjectSchema } from './CityCreateManyCountryInputEnvelope.schema'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityCreateNestedManyWithoutCountryInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CityCreateWithoutCountryInputObjectSchema),
        z.lazy(() => CityCreateWithoutCountryInputObjectSchema).array(),
        z.lazy(() => CityUncheckedCreateWithoutCountryInputObjectSchema),
        z
          .lazy(() => CityUncheckedCreateWithoutCountryInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CityCreateOrConnectWithoutCountryInputObjectSchema),
        z
          .lazy(() => CityCreateOrConnectWithoutCountryInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CityCreateManyCountryInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => CityWhereUniqueInputObjectSchema),
        z.lazy(() => CityWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const CityCreateNestedManyWithoutCountryInputObjectSchema = Schema
