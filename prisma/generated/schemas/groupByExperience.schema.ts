import { z } from 'zod'
import { ExperienceWhereInputObjectSchema } from './objects/ExperienceWhereInput.schema'
import { ExperienceOrderByWithAggregationInputObjectSchema } from './objects/ExperienceOrderByWithAggregationInput.schema'
import { ExperienceScalarWhereWithAggregatesInputObjectSchema } from './objects/ExperienceScalarWhereWithAggregatesInput.schema'
import { ExperienceScalarFieldEnumSchema } from './enums/ExperienceScalarFieldEnum.schema'

export const ExperienceGroupBySchema = z.object({
  where: ExperienceWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ExperienceOrderByWithAggregationInputObjectSchema,
      ExperienceOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ExperienceScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ExperienceScalarFieldEnumSchema),
})
