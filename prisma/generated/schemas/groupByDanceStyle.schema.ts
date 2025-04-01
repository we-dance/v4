import { z } from 'zod'
import { DanceStyleWhereInputObjectSchema } from './objects/DanceStyleWhereInput.schema'
import { DanceStyleOrderByWithAggregationInputObjectSchema } from './objects/DanceStyleOrderByWithAggregationInput.schema'
import { DanceStyleScalarWhereWithAggregatesInputObjectSchema } from './objects/DanceStyleScalarWhereWithAggregatesInput.schema'
import { DanceStyleScalarFieldEnumSchema } from './enums/DanceStyleScalarFieldEnum.schema'

export const DanceStyleGroupBySchema = z.object({
  where: DanceStyleWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      DanceStyleOrderByWithAggregationInputObjectSchema,
      DanceStyleOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: DanceStyleScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(DanceStyleScalarFieldEnumSchema),
})
