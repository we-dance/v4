import { z } from 'zod'
import { GuestOrderByWithRelationInputObjectSchema } from './objects/GuestOrderByWithRelationInput.schema'
import { GuestWhereInputObjectSchema } from './objects/GuestWhereInput.schema'
import { GuestWhereUniqueInputObjectSchema } from './objects/GuestWhereUniqueInput.schema'
import { GuestCountAggregateInputObjectSchema } from './objects/GuestCountAggregateInput.schema'
import { GuestMinAggregateInputObjectSchema } from './objects/GuestMinAggregateInput.schema'
import { GuestMaxAggregateInputObjectSchema } from './objects/GuestMaxAggregateInput.schema'

export const GuestAggregateSchema = z.object({
  orderBy: z
    .union([
      GuestOrderByWithRelationInputObjectSchema,
      GuestOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: GuestWhereInputObjectSchema.optional(),
  cursor: GuestWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), GuestCountAggregateInputObjectSchema])
    .optional(),
  _min: GuestMinAggregateInputObjectSchema.optional(),
  _max: GuestMaxAggregateInputObjectSchema.optional(),
})
