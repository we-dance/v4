import { z } from 'zod'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'
import { EventUpdateManyMutationInputObjectSchema } from './EventUpdateManyMutationInput.schema'
import { EventUncheckedUpdateManyWithoutEventsCreatedInputObjectSchema } from './EventUncheckedUpdateManyWithoutEventsCreatedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutCreatorInput> = z
  .object({
    where: z.lazy(() => EventScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateManyMutationInputObjectSchema),
      z.lazy(
        () => EventUncheckedUpdateManyWithoutEventsCreatedInputObjectSchema
      ),
    ]),
  })
  .strict()

export const EventUpdateManyWithWhereWithoutCreatorInputObjectSchema = Schema
