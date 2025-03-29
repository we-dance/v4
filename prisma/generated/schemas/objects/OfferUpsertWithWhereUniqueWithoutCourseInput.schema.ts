import { z } from 'zod'
import { OfferWhereUniqueInputObjectSchema } from './OfferWhereUniqueInput.schema'
import { OfferUpdateWithoutCourseInputObjectSchema } from './OfferUpdateWithoutCourseInput.schema'
import { OfferUncheckedUpdateWithoutCourseInputObjectSchema } from './OfferUncheckedUpdateWithoutCourseInput.schema'
import { OfferCreateWithoutCourseInputObjectSchema } from './OfferCreateWithoutCourseInput.schema'
import { OfferUncheckedCreateWithoutCourseInputObjectSchema } from './OfferUncheckedCreateWithoutCourseInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferUpsertWithWhereUniqueWithoutCourseInput> = z
  .object({
    where: z.lazy(() => OfferWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => OfferUpdateWithoutCourseInputObjectSchema),
      z.lazy(() => OfferUncheckedUpdateWithoutCourseInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => OfferCreateWithoutCourseInputObjectSchema),
      z.lazy(() => OfferUncheckedCreateWithoutCourseInputObjectSchema),
    ]),
  })
  .strict()

export const OfferUpsertWithWhereUniqueWithoutCourseInputObjectSchema = Schema
