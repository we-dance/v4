import { z } from 'zod';

const scheduleSchema = z.object({
  summer: z.array(z.string()).optional(),
  winter: z.array(z.string()).optional(),
});

const linksSchema = z.object({
  whatsapp: z.string().url().optional(),
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
});

const communityFeatureSchema = z.object({
  eventCalendar: z.boolean().default(false),
  photoGallery: z.boolean().default(false),
  communityUpdates: z.boolean().default(false),
  memberDirectory: z.boolean().default(false),
  discussionBoard: z.boolean().default(false),
});

export const communitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  memberCount: z.number().default(0),
  city: z.string(),
  style: z.string().optional(),
  schedule: scheduleSchema.optional(),
  links: linksSchema.optional(),
  features: communityFeatureSchema.optional(),
  privacy: z.enum(['public', 'semi-private', 'private']).default('public'),
  admins: z.array(z.string()).default([]),
  mission: z.string().optional(),
  guidelines: z.string().optional(),
  membershipRules: z.string().optional(),
  venues: z.array(z.string()).optional(),
  regularActivities: z.array(z.string()).optional(),
});

export type Community = z.infer<typeof communitySchema>;

// Helper function to validate mock data
export const validateCommunity = (data: unknown): Community => {
  return communitySchema.parse(data);
};

// Helper function to validate array of communities
export const validateCommunities = (data: unknown[]): Community[] => {
  return z.array(communitySchema).parse(data);
}; 