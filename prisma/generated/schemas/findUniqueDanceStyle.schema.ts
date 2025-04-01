import { z } from 'zod'
import { DanceStyleSelectObjectSchema } from './objects/DanceStyleSelect.schema'
import { DanceStyleIncludeObjectSchema } from './objects/DanceStyleInclude.schema'
import { DanceStyleWhereUniqueInputObjectSchema } from './objects/DanceStyleWhereUniqueInput.schema'

export const DanceStyleFindUniqueSchema = z.object({
  select: DanceStyleSelectObjectSchema.optional(),
  include: DanceStyleIncludeObjectSchema.optional(),
  where: DanceStyleWhereUniqueInputObjectSchema,
})
