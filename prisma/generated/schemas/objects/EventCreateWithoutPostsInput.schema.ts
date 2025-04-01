import { z } from 'zod'
import { DanceStyleCreateNestedManyWithoutEventsInputObjectSchema } from './DanceStyleCreateNestedManyWithoutEventsInput.schema'
import { ProfileCreateNestedOneWithoutEventsCreatedInputObjectSchema } from './ProfileCreateNestedOneWithoutEventsCreatedInput.schema'
import { ProfileCreateNestedOneWithoutEventsOrganizedInputObjectSchema } from './ProfileCreateNestedOneWithoutEventsOrganizedInput.schema'
import { ProfileCreateNestedOneWithoutEventsHostedInputObjectSchema } from './ProfileCreateNestedOneWithoutEventsHostedInput.schema'
import { GuestCreateNestedManyWithoutEventInputObjectSchema } from './GuestCreateNestedManyWithoutEventInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateWithoutPostsInput> = z
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
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    styles: z
      .lazy(() => DanceStyleCreateNestedManyWithoutEventsInputObjectSchema)
      .optional(),
    creator: z.lazy(
      () => ProfileCreateNestedOneWithoutEventsCreatedInputObjectSchema
    ),
    organizer: z.lazy(
      () => ProfileCreateNestedOneWithoutEventsOrganizedInputObjectSchema
    ),
    venue: z.lazy(
      () => ProfileCreateNestedOneWithoutEventsHostedInputObjectSchema
    ),
    guests: z
      .lazy(() => GuestCreateNestedManyWithoutEventInputObjectSchema)
      .optional(),
  })
  .strict()

export const EventCreateWithoutPostsInputObjectSchema = Schema
