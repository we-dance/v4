import { z } from 'zod'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'
import { EventUpdateManyMutationInputObjectSchema } from './EventUpdateManyMutationInput.schema'
import { EventUncheckedUpdateManyWithoutEventsOrganizedInputObjectSchema } from './EventUncheckedUpdateManyWithoutEventsOrganizedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutOrganizerInput> =
  z
    .object({
      where: z.lazy(() => EventScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => EventUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => EventUncheckedUpdateManyWithoutEventsOrganizedInputObjectSchema
        ),
      ]),
    })
    .strict()

export const EventUpdateManyWithWhereWithoutOrganizerInputObjectSchema = Schema
