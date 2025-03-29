import { z } from 'zod'
import { PostUncheckedCreateNestedManyWithoutEventInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutEventInput.schema'
import { GuestUncheckedCreateNestedManyWithoutEventInputObjectSchema } from './GuestUncheckedCreateNestedManyWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedCreateWithoutStylesInput> = z
  .object({
    id: z.string().optional(),
    shortId: z.string().optional(),
    slug: z.string(),
    name: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    type: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    price: z.string().optional(),
    firebaseId: z.string().optional(),
    published: z.boolean().optional(),
    creatorId: z.string(),
    organizerId: z.string(),
    venueId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    posts: z
      .lazy(() => PostUncheckedCreateNestedManyWithoutEventInputObjectSchema)
      .optional(),
    guests: z
      .lazy(() => GuestUncheckedCreateNestedManyWithoutEventInputObjectSchema)
      .optional(),
  })
  .strict()

export const EventUncheckedCreateWithoutStylesInputObjectSchema = Schema
