import { z } from 'zod'
import { OfferScalarWhereInputObjectSchema } from './OfferScalarWhereInput.schema'
import { OfferUpdateManyMutationInputObjectSchema } from './OfferUpdateManyMutationInput.schema'
import { OfferUncheckedUpdateManyWithoutOffersInputObjectSchema } from './OfferUncheckedUpdateManyWithoutOffersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.OfferUpdateManyWithWhereWithoutCourseInput> = z
  .object({
    where: z.lazy(() => OfferScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => OfferUpdateManyMutationInputObjectSchema),
      z.lazy(() => OfferUncheckedUpdateManyWithoutOffersInputObjectSchema),
    ]),
  })
  .strict()

export const OfferUpdateManyWithWhereWithoutCourseInputObjectSchema = Schema
