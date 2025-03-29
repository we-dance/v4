import { z } from 'zod'
import { EventUpdateWithoutPostsInputObjectSchema } from './EventUpdateWithoutPostsInput.schema'
import { EventUncheckedUpdateWithoutPostsInputObjectSchema } from './EventUncheckedUpdateWithoutPostsInput.schema'
import { EventCreateWithoutPostsInputObjectSchema } from './EventCreateWithoutPostsInput.schema'
import { EventUncheckedCreateWithoutPostsInputObjectSchema } from './EventUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithoutPostsInput> = z
  .object({
    update: z.union([
      z.lazy(() => EventUpdateWithoutPostsInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutPostsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EventCreateWithoutPostsInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const EventUpsertWithoutPostsInputObjectSchema = Schema
