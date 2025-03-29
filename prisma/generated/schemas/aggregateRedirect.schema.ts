import { z } from 'zod'
import { RedirectOrderByWithRelationInputObjectSchema } from './objects/RedirectOrderByWithRelationInput.schema'
import { RedirectWhereInputObjectSchema } from './objects/RedirectWhereInput.schema'
import { RedirectWhereUniqueInputObjectSchema } from './objects/RedirectWhereUniqueInput.schema'
import { RedirectCountAggregateInputObjectSchema } from './objects/RedirectCountAggregateInput.schema'
import { RedirectMinAggregateInputObjectSchema } from './objects/RedirectMinAggregateInput.schema'
import { RedirectMaxAggregateInputObjectSchema } from './objects/RedirectMaxAggregateInput.schema'

export const RedirectAggregateSchema = z.object({
  orderBy: z
    .union([
      RedirectOrderByWithRelationInputObjectSchema,
      RedirectOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RedirectWhereInputObjectSchema.optional(),
  cursor: RedirectWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), RedirectCountAggregateInputObjectSchema])
    .optional(),
  _min: RedirectMinAggregateInputObjectSchema.optional(),
  _max: RedirectMaxAggregateInputObjectSchema.optional(),
})
