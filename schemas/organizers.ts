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

const OrganizerLinksSchema = z.array(z.string()) // sameAs requires an array of URLs

const OrganizerAddressSchema = z.object({
  '@type': z.literal('PostalAddress'),
  addressLocality: z.string(),
  addressCountry: z.string(),
})

const OrganizerEventSchema = z.object({
  '@type': z.literal('Event'),
  name: z.string(),
  startDate: z.string(), // ISO 8601 date format recommended
  location: z.object({
    '@type': z.literal('Place'),
    address: OrganizerAddressSchema,
  }),
})

const OrganizerFeaturesSchema = z.array(
  z.object({
    '@type': z.literal('PropertyValue'),
    name: z.string(),
    value: z.boolean(),
  })
)

export const OrganizerSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.array(z.enum(['Person', 'Organization'])),
  id: z.string(),
  url: z.string().url().optional(),
  name: z.string(),
  email: z.string().email(),
  contactPoint: z.array(
    z.object({
      '@type': z.literal('ContactPoint'),
      contactType: z.string().optional(),
      telephone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
      email: z.string().email(),
    })
  ),
  location: z.string(), // Replaces  address to location
  logo: z.string().url(), // Organization logo to avatar
  image: z.string().url(), // Cover image to image
  keywords: z.array(z.string()), // Replaces styles to keywords
  event: z.array(z.string()), // Replaces eventTypes to event
  description: z.string(), // Replaces bio to description
  track: z.number().default(0), // eventCount  to track
  sameAs: OrganizerLinksSchema.optional(), // Replaces links to sameAs
  additionalProperty: OrganizerFeaturesSchema.optional(), // Replaces features to additionalProperty
  serviceArea: z.enum(['public', 'semi-private', 'private']).default('public'),
  founder: z.array(z.string()).default([]), // Replaces admins to founder
  mainEntityOfPage: z.string().optional(), // You can adjust this as needed
  makesOffer: z.array(z.string()).optional(), // Replaces regularActivities to makesOffer
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
