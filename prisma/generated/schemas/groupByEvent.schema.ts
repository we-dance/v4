import { z } from 'zod'
import { EventWhereInputObjectSchema } from './objects/EventWhereInput.schema'
import { EventOrderByWithAggregationInputObjectSchema } from './objects/EventOrderByWithAggregationInput.schema'
import { EventScalarWhereWithAggregatesInputObjectSchema } from './objects/EventScalarWhereWithAggregatesInput.schema'
import { EventScalarFieldEnumSchema } from './enums/EventScalarFieldEnum.schema'

export const EventGroupBySchema = z.object({
  where: EventWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      EventOrderByWithAggregationInputObjectSchema,
      EventOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: EventScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(EventScalarFieldEnumSchema),
})
