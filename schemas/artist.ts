import { z } from 'zod';

const pricingSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  duration: z.number(),
  note: z.string().optional(),
});

const availabilitySchema = z.object({
  privateClasses: z.boolean().default(false),
  workshops: z.boolean().default(false),
  touring: z.boolean().default(false),
  currentLocation: z.string().optional(),
  pricing: z.object({
    privateClass: pricingSchema.optional(),
    workshop: pricingSchema.optional(),
  }).optional(),
});

const experienceSchema = z.object({
  years: z.number().optional(),
  teachingLevels: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

const socialMediaSchema = z.object({
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().optional(),
});

export const artistSchema = z.object({
  id: z.number(),
  name: z.string(),
  roles: z.array(z.string()),
  specialties: z.array(z.string()),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'master']),
  location: z.string(),
  image: z.string().url(),
  followers: z.string(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().default(0),
  languages: z.array(z.string()),
  experience: experienceSchema,
  availability: availabilitySchema,
  certifications: z.array(z.string()).optional(),
  socialMedia: socialMediaSchema.optional(),
  instruments: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  albums: z.array(z.string()).optional(),
  collaborations: z.array(z.string()).optional(),
  otherAchievements: z.array(z.string()).optional(),
});

export type Artist = z.infer<typeof artistSchema>;

// Helper function to validate mock data
export const validateArtist = (data: unknown): Artist => {
  return artistSchema.parse(data);
};

// Helper function to validate array of artists
export const validateArtists = (data: unknown[]): Artist[] => {
  return z.array(artistSchema).parse(data);
}; 