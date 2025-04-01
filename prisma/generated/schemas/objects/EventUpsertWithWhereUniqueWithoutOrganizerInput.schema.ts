import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutOrganizerInputObjectSchema } from './EventUpdateWithoutOrganizerInput.schema'
import { EventUncheckedUpdateWithoutOrganizerInputObjectSchema } from './EventUncheckedUpdateWithoutOrganizerInput.schema'
import { EventCreateWithoutOrganizerInputObjectSchema } from './EventCreateWithoutOrganizerInput.schema'
import { EventUncheckedCreateWithoutOrganizerInputObjectSchema } from './EventUncheckedCreateWithoutOrganizerInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutOrganizerInput> =
  z
    .object({
      where: z.lazy(() => EventWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => EventUpdateWithoutOrganizerInputObjectSchema),
        z.lazy(() => EventUncheckedUpdateWithoutOrganizerInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => EventCreateWithoutOrganizerInputObjectSchema),
        z.lazy(() => EventUncheckedCreateWithoutOrganizerInputObjectSchema),
      ]),
    })
    .strict()

export const EventUpsertWithWhereUniqueWithoutOrganizerInputObjectSchema =
  Schema
