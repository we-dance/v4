import { z } from 'zod'

// Schedule schema
export const communityScheduleSchema = z.object({
  summer: z.array(z.string()),
  winter: z.array(z.string()),
})

// Links schema
export const communityLinksSchema = z.object({
  whatsapp: z.string().url().optional(),
})

// Community schema
export const communitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  memberCount: z.number().int().positive(),
  city: z.string(),
  style: z.string().optional(),
  schedule: communityScheduleSchema.optional(),
  links: communityLinksSchema.optional(),
})

// Export types
export type CommunitySchedule = z.infer<typeof communityScheduleSchema>
export type CommunityLinks = z.infer<typeof communityLinksSchema>
export type Community = z.infer<typeof communitySchema>
