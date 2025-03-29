import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { CourseModuleUncheckedUpdateManyWithoutCourseNestedInputObjectSchema } from './CourseModuleUncheckedUpdateManyWithoutCourseNestedInput.schema'
import { CourseResourceUncheckedUpdateManyWithoutCourseNestedInputObjectSchema } from './CourseResourceUncheckedUpdateManyWithoutCourseNestedInput.schema'
import { OfferUncheckedUpdateManyWithoutCourseNestedInputObjectSchema } from './OfferUncheckedUpdateManyWithoutCourseNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutInstructorInput> = z
  .object({
    id: z
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
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    subheader: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
    coverUrl: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional()
      .nullable(),
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
    modules: z
      .lazy(
        () =>
          CourseModuleUncheckedUpdateManyWithoutCourseNestedInputObjectSchema
      )
      .optional(),
    resources: z
      .lazy(
        () =>
          CourseResourceUncheckedUpdateManyWithoutCourseNestedInputObjectSchema
      )
      .optional(),
    offers: z
      .lazy(() => OfferUncheckedUpdateManyWithoutCourseNestedInputObjectSchema)
      .optional(),
  })
  .strict()

export const CourseUncheckedUpdateWithoutInstructorInputObjectSchema = Schema
