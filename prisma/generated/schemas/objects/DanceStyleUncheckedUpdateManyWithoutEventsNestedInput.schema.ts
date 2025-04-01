import { z } from 'zod'
import { DanceStyleCreateWithoutEventsInputObjectSchema } from './DanceStyleCreateWithoutEventsInput.schema'
import { DanceStyleUncheckedCreateWithoutEventsInputObjectSchema } from './DanceStyleUncheckedCreateWithoutEventsInput.schema'
import { DanceStyleCreateOrConnectWithoutEventsInputObjectSchema } from './DanceStyleCreateOrConnectWithoutEventsInput.schema'
import { DanceStyleUpsertWithWhereUniqueWithoutEventsInputObjectSchema } from './DanceStyleUpsertWithWhereUniqueWithoutEventsInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './DanceStyleWhereUniqueInput.schema'
import { DanceStyleUpdateWithWhereUniqueWithoutEventsInputObjectSchema } from './DanceStyleUpdateWithWhereUniqueWithoutEventsInput.schema'
import { DanceStyleUpdateManyWithWhereWithoutEventsInputObjectSchema } from './DanceStyleUpdateManyWithWhereWithoutEventsInput.schema'
import { DanceStyleScalarWhereInputObjectSchema } from './DanceStyleScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.DanceStyleUncheckedUpdateManyWithoutEventsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DanceStyleCreateWithoutEventsInputObjectSchema),
          z.lazy(() => DanceStyleCreateWithoutEventsInputObjectSchema).array(),
          z.lazy(() => DanceStyleUncheckedCreateWithoutEventsInputObjectSchema),
          z
            .lazy(() => DanceStyleUncheckedCreateWithoutEventsInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => DanceStyleCreateOrConnectWithoutEventsInputObjectSchema),
          z
            .lazy(() => DanceStyleCreateOrConnectWithoutEventsInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => DanceStyleUpsertWithWhereUniqueWithoutEventsInputObjectSchema
          ),
          z
            .lazy(
              () =>
                DanceStyleUpsertWithWhereUniqueWithoutEventsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema),
          z.lazy(() => DanceStyleWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => DanceStyleUpdateWithWhereUniqueWithoutEventsInputObjectSchema
          ),
          z
            .lazy(
              () =>
                DanceStyleUpdateWithWhereUniqueWithoutEventsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => DanceStyleUpdateManyWithWhereWithoutEventsInputObjectSchema
          ),
          z
            .lazy(
              () => DanceStyleUpdateManyWithWhereWithoutEventsInputObjectSchema
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => DanceStyleScalarWhereInputObjectSchema),
          z.lazy(() => DanceStyleScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const DanceStyleUncheckedUpdateManyWithoutEventsNestedInputObjectSchema =
  Schema
