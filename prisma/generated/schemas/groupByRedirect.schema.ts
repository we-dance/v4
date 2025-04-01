import { z } from 'zod'
import { RedirectWhereInputObjectSchema } from './objects/RedirectWhereInput.schema'
import { RedirectOrderByWithAggregationInputObjectSchema } from './objects/RedirectOrderByWithAggregationInput.schema'
import { RedirectScalarWhereWithAggregatesInputObjectSchema } from './objects/RedirectScalarWhereWithAggregatesInput.schema'
import { RedirectScalarFieldEnumSchema } from './enums/RedirectScalarFieldEnum.schema'

export const RedirectGroupBySchema = z.object({
  where: RedirectWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      RedirectOrderByWithAggregationInputObjectSchema,
      RedirectOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: RedirectScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(RedirectScalarFieldEnumSchema),
})
