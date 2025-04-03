import { z } from 'zod'
import { GuestScalarWhereInputObjectSchema } from './GuestScalarWhereInput.schema'
import { GuestUpdateManyMutationInputObjectSchema } from './GuestUpdateManyMutationInput.schema'
import { GuestUncheckedUpdateManyWithoutGuestsInputObjectSchema } from './GuestUncheckedUpdateManyWithoutGuestsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpdateManyWithWhereWithoutEventInput> = z
  .object({
    where: z.lazy(() => GuestScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => GuestUpdateManyMutationInputObjectSchema),
      z.lazy(() => GuestUncheckedUpdateManyWithoutGuestsInputObjectSchema),
    ]),
  })
  .strict()

export const GuestUpdateManyWithWhereWithoutEventInputObjectSchema = Schema
