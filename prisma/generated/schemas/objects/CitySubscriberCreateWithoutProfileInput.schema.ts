import { z } from 'zod'
import { CityCreateNestedOneWithoutSubscribersInputObjectSchema } from './CityCreateNestedOneWithoutSubscribersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CitySubscriberCreateWithoutProfileInput> = z
  .object({
    city: z.lazy(() => CityCreateNestedOneWithoutSubscribersInputObjectSchema),
  })
  .strict()

export const CitySubscriberCreateWithoutProfileInputObjectSchema = Schema
