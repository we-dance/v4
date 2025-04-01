import { z } from 'zod'
import { EventCreateWithoutPostsInputObjectSchema } from './EventCreateWithoutPostsInput.schema'
import { EventUncheckedCreateWithoutPostsInputObjectSchema } from './EventUncheckedCreateWithoutPostsInput.schema'
import { EventCreateOrConnectWithoutPostsInputObjectSchema } from './EventCreateOrConnectWithoutPostsInput.schema'
import { EventUpsertWithoutPostsInputObjectSchema } from './EventUpsertWithoutPostsInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutPostsInputObjectSchema } from './EventUpdateWithoutPostsInput.schema'
import { EventUncheckedUpdateWithoutPostsInputObjectSchema } from './EventUncheckedUpdateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateOneWithoutPostsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutPostsInputObjectSchema),
        z.lazy(() => EventUncheckedCreateWithoutPostsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => EventCreateOrConnectWithoutPostsInputObjectSchema)
      .optional(),
    upsert: z.lazy(() => EventUpsertWithoutPostsInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => EventWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => EventUpdateWithoutPostsInputObjectSchema),
        z.lazy(() => EventUncheckedUpdateWithoutPostsInputObjectSchema),
      ])
      .optional(),
  })
  .strict()

export const EventUpdateOneWithoutPostsNestedInputObjectSchema = Schema
