import { z } from 'zod'
import { CourseCreateNestedOneWithoutResourcesInputObjectSchema } from './CourseCreateNestedOneWithoutResourcesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CourseResourceCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    url: z.string(),
    locked: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    course: z.lazy(
      () => CourseCreateNestedOneWithoutResourcesInputObjectSchema
    ),
  })
  .strict()

export const CourseResourceCreateInputObjectSchema = Schema
