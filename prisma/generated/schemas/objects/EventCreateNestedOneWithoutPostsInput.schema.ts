import { z } from 'zod'
import { EventCreateWithoutPostsInputObjectSchema } from './EventCreateWithoutPostsInput.schema'
import { EventUncheckedCreateWithoutPostsInputObjectSchema } from './EventUncheckedCreateWithoutPostsInput.schema'
import { EventCreateOrConnectWithoutPostsInputObjectSchema } from './EventCreateOrConnectWithoutPostsInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedOneWithoutPostsInput> = z
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
    connect: z.lazy(() => EventWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const EventCreateNestedOneWithoutPostsInputObjectSchema = Schema
