import { z } from 'zod'

const DanceStyleSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const danceStylesSchema = z.array(DanceStyleSchema)

const EventTypeSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const eventTypesSchema = z.array(EventTypeSchema)

const OrganizerLinksSchema = z.object({
  whatsapp: z.string().url().optional(),
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  website: z.string().url().optional(),
  telegram: z.string().url().optional(),
  discord: z.string().url().optional(),
})

const OrganizerFeaturesSchema = z.object({
  eventCalendar: z.boolean().default(false),
  photoGallery: z.boolean().default(false),
  communityUpdates: z.boolean().default(false),
  memberDirectory: z.boolean().default(false),
  discussionBoard: z.boolean().default(false),
})

export const OrganizerSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.enum(['Person', 'Organization']),
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  url: z.string().url().optional(),
  contactPoint: z.array(
    z.object({
      '@type': z.literal('ContactPoint'),
      contactType: z.string().optional(),
      telephone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
      email: z.string().email(),
    })
  ),
  location: z.string(),
  avatar: z.string().url(),
  coverImage: z.string().url(),
  styles: z.array(z.string()),
  eventTypes: z.array(z.string()),
  bio: z.string(),
  eventCount: z.number().default(0),
  links: OrganizerLinksSchema.optional(),
  features: OrganizerFeaturesSchema.optional(),
  privacy: z.enum(['public', 'semi-private', 'private']).default('public'),
  admins: z.array(z.string()).default([]),
  mission: z.string().optional(),
  guidelines: z.string().optional(),
  membershipRules: z.string().optional(),
  venues: z.array(z.string()).optional(),
  regularActivities: z.array(z.string()).optional(),
})

export type Organizer = z.infer<typeof OrganizerSchema>

export const validateOrganizer = (data: unknown): Organizer => {
  return OrganizerSchema.parse(data)
}

export const validateOrganizers = (data: unknown[]): Organizer[] => {
  return z.array(OrganizerSchema).parse(data)
}
