import { z } from 'zod'
import { OfferCreateWithoutCourseInputObjectSchema } from './OfferCreateWithoutCourseInput.schema'
import { OfferUncheckedCreateWithoutCourseInputObjectSchema } from './OfferUncheckedCreateWithoutCourseInput.schema'
import { OfferCreateOrConnectWithoutCourseInputObjectSchema } from './OfferCreateOrConnectWithoutCourseInput.schema'
import { OfferUpsertWithWhereUniqueWithoutCourseInputObjectSchema } from './OfferUpsertWithWhereUniqueWithoutCourseInput.schema'
import { OfferCreateManyCourseInputEnvelopeObjectSchema } from './OfferCreateManyCourseInputEnvelope.schema'
import { OfferWhereUniqueInputObjectSchema } from './OfferWhereUniqueInput.schema'
import { OfferUpdateWithWhereUniqueWithoutCourseInputObjectSchema } from './OfferUpdateWithWhereUniqueWithoutCourseInput.schema'
import { OfferUpdateManyWithWhereWithoutCourseInputObjectSchema } from './OfferUpdateManyWithWhereWithoutCourseInput.schema'
import { OfferScalarWhereInputObjectSchema } from './OfferScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferUpdateManyWithoutCourseNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => OfferCreateWithoutCourseInputObjectSchema),
        z.lazy(() => OfferCreateWithoutCourseInputObjectSchema).array(),
        z.lazy(() => OfferUncheckedCreateWithoutCourseInputObjectSchema),
        z
          .lazy(() => OfferUncheckedCreateWithoutCourseInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => OfferCreateOrConnectWithoutCourseInputObjectSchema),
        z
          .lazy(() => OfferCreateOrConnectWithoutCourseInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => OfferUpsertWithWhereUniqueWithoutCourseInputObjectSchema),
        z
          .lazy(() => OfferUpsertWithWhereUniqueWithoutCourseInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => OfferCreateManyCourseInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => OfferWhereUniqueInputObjectSchema),
        z.lazy(() => OfferWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => OfferWhereUniqueInputObjectSchema),
        z.lazy(() => OfferWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => OfferWhereUniqueInputObjectSchema),
        z.lazy(() => OfferWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => OfferWhereUniqueInputObjectSchema),
        z.lazy(() => OfferWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => OfferUpdateWithWhereUniqueWithoutCourseInputObjectSchema),
        z
          .lazy(() => OfferUpdateWithWhereUniqueWithoutCourseInputObjectSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => OfferUpdateManyWithWhereWithoutCourseInputObjectSchema),
        z
          .lazy(() => OfferUpdateManyWithWhereWithoutCourseInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => OfferScalarWhereInputObjectSchema),
        z.lazy(() => OfferScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const OfferUpdateManyWithoutCourseNestedInputObjectSchema = Schema
