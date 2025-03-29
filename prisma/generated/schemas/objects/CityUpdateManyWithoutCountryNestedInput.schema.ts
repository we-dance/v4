import { z } from 'zod'
import { CityCreateWithoutCountryInputObjectSchema } from './CityCreateWithoutCountryInput.schema'
import { CityUncheckedCreateWithoutCountryInputObjectSchema } from './CityUncheckedCreateWithoutCountryInput.schema'
import { CityCreateOrConnectWithoutCountryInputObjectSchema } from './CityCreateOrConnectWithoutCountryInput.schema'
import { CityUpsertWithWhereUniqueWithoutCountryInputObjectSchema } from './CityUpsertWithWhereUniqueWithoutCountryInput.schema'
import { CityCreateManyCountryInputEnvelopeObjectSchema } from './CityCreateManyCountryInputEnvelope.schema'
import { CityWhereUniqueInputObjectSchema } from './CityWhereUniqueInput.schema'
import { CityUpdateWithWhereUniqueWithoutCountryInputObjectSchema } from './CityUpdateWithWhereUniqueWithoutCountryInput.schema'
import { CityUpdateManyWithWhereWithoutCountryInputObjectSchema } from './CityUpdateManyWithWhereWithoutCountryInput.schema'
import { CityScalarWhereInputObjectSchema } from './CityScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CityUpdateManyWithoutCountryNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => CityUpsertWithWhereUniqueWithoutCountryInputObjectSchema),
        z
          .lazy(() => CityUpsertWithWhereUniqueWithoutCountryInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CityCreateManyCountryInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => CityWhereUniqueInputObjectSchema),
        z.lazy(() => CityWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CityWhereUniqueInputObjectSchema),
        z.lazy(() => CityWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => CityWhereUniqueInputObjectSchema),
        z.lazy(() => CityWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => CityWhereUniqueInputObjectSchema),
        z.lazy(() => CityWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => CityUpdateWithWhereUniqueWithoutCountryInputObjectSchema),
        z
          .lazy(() => CityUpdateWithWhereUniqueWithoutCountryInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CityUpdateManyWithWhereWithoutCountryInputObjectSchema),
        z
          .lazy(() => CityUpdateManyWithWhereWithoutCountryInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CityScalarWhereInputObjectSchema),
        z.lazy(() => CityScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const CityUpdateManyWithoutCountryNestedInputObjectSchema = Schema
