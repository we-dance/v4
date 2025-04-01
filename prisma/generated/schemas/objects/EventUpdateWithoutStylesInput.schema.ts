import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema'
import { ProfileUpdateOneRequiredWithoutEventsCreatedNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutEventsCreatedNestedInput.schema'
import { ProfileUpdateOneRequiredWithoutEventsOrganizedNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutEventsOrganizedNestedInput.schema'
import { ProfileUpdateOneRequiredWithoutEventsHostedNestedInputObjectSchema } from './ProfileUpdateOneRequiredWithoutEventsHostedNestedInput.schema'
import { PostUpdateManyWithoutEventNestedInputObjectSchema } from './PostUpdateManyWithoutEventNestedInput.schema'
import { GuestUpdateManyWithoutEventNestedInputObjectSchema } from './GuestUpdateManyWithoutEventNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithoutStylesInput> = z
  .object({
    id: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    shortId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    slug: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    startDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    endDate: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    type: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    description: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    cover: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    price: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    firebaseId: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    published: z
      .union([
        z.boolean(),
        z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    creator: z
      .lazy(
        () =>
          ProfileUpdateOneRequiredWithoutEventsCreatedNestedInputObjectSchema
      )
      .optional(),
    organizer: z
      .lazy(
        () =>
          ProfileUpdateOneRequiredWithoutEventsOrganizedNestedInputObjectSchema
      )
      .optional(),
    venue: z
      .lazy(
        () => ProfileUpdateOneRequiredWithoutEventsHostedNestedInputObjectSchema
      )
      .optional(),
    posts: z
      .lazy(() => PostUpdateManyWithoutEventNestedInputObjectSchema)
      .optional(),
    guests: z
      .lazy(() => GuestUpdateManyWithoutEventNestedInputObjectSchema)
      .optional(),
  })
  .strict()

export const EventUpdateWithoutStylesInputObjectSchema = Schema
