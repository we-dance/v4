import { z } from 'zod'
import { GuestScalarWhereInputObjectSchema } from './GuestScalarWhereInput.schema'
import { GuestUpdateManyMutationInputObjectSchema } from './GuestUpdateManyMutationInput.schema'
import { GuestUncheckedUpdateManyWithoutEventsParticipatedInputObjectSchema } from './GuestUncheckedUpdateManyWithoutEventsParticipatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.GuestUpdateManyWithWhereWithoutProfileInput> = z
  .object({
    where: z.lazy(() => GuestScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => GuestUpdateManyMutationInputObjectSchema),
      z.lazy(
        () => GuestUncheckedUpdateManyWithoutEventsParticipatedInputObjectSchema
      ),
    ]),
  })
  .strict()

export const GuestUpdateManyWithWhereWithoutProfileInputObjectSchema = Schema
