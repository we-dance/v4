import { z } from 'zod'
import { DanceStyleSelectObjectSchema } from './objects/DanceStyleSelect.schema'
import { DanceStyleIncludeObjectSchema } from './objects/DanceStyleInclude.schema'
import { DanceStyleUpdateInputObjectSchema } from './objects/DanceStyleUpdateInput.schema'
import { DanceStyleUncheckedUpdateInputObjectSchema } from './objects/DanceStyleUncheckedUpdateInput.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './objects/DanceStyleWhereUniqueInput.schema'

export const DanceStyleUpdateOneSchema = z.object({
  select: DanceStyleSelectObjectSchema.optional(),
  include: DanceStyleIncludeObjectSchema.optional(),
  data: z.union([
    DanceStyleUpdateInputObjectSchema,
    DanceStyleUncheckedUpdateInputObjectSchema,
  ]),
  where: DanceStyleWhereUniqueInputObjectSchema,
})
