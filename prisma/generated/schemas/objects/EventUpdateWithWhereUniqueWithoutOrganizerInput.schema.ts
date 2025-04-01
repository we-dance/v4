import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutOrganizerInputObjectSchema } from './EventUpdateWithoutOrganizerInput.schema'
import { EventUncheckedUpdateWithoutOrganizerInputObjectSchema } from './EventUncheckedUpdateWithoutOrganizerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutOrganizerInput> =
  z
    .object({
      where: z.lazy(() => EventWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => EventUpdateWithoutOrganizerInputObjectSchema),
        z.lazy(() => EventUncheckedUpdateWithoutOrganizerInputObjectSchema),
      ]),
    })
    .strict()

export const EventUpdateWithWhereUniqueWithoutOrganizerInputObjectSchema =
  Schema
