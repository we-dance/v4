import { z } from 'zod'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'
import { EventUpdateManyMutationInputObjectSchema } from './EventUpdateManyMutationInput.schema'
import { EventUncheckedUpdateManyWithoutEventsHostedInputObjectSchema } from './EventUncheckedUpdateManyWithoutEventsHostedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutVenueInput> = z
  .object({
    where: z.lazy(() => EventScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateManyMutationInputObjectSchema),
      z.lazy(
        () => EventUncheckedUpdateManyWithoutEventsHostedInputObjectSchema
      ),
    ]),
  })
  .strict()

export const EventUpdateManyWithWhereWithoutVenueInputObjectSchema = Schema
