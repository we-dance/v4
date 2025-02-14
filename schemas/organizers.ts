import { z } from 'zod'
import type { Organization } from 'schema-dts'
import type { Person } from 'schema-dts'
import type { WithContext } from 'schema-dts'

const OrganizerLinksSchema = z.array(z.string().url()) // sameAs requires an array of URLs

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

// Define the main schema for an `Organizer`
export const OrganizerSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.union([z.literal('Person'), z.literal('Organization')]), // `Person` or `Organization`
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
  location: z.string(), // Replaces address to location
  logo: z.string().url(), // Organization logo to avatar
  image: z.string().url(), // Cover image to image
  knowsAbout: z.array(z.string()), // Replaces styles to keywords
  event: z.array(z.string()), // Replaces eventTypes to event
  description: z.string(), // Replaces bio to description
  track: z.number().default(0), // eventCount to track
  sameAs: OrganizerLinksSchema.optional(), // Replaces links to sameAs
  additionalProperty: OrganizerFeaturesSchema.optional(), // Replaces features to additionalProperty
  serviceArea: z.enum(['public', 'semi-private', 'private']).default('public'),
  founder: z.array(z.string()).default([]), // Replaces admins to founder
  slogan: z.string().optional(),
  makesOffer: z.array(z.string()).optional(), // Replaces regularActivities to makesOffer
  diversityPolicy: z.string().optional(), /// guidelines to diversityPolicy
  ethicsPolicy: z.string().optional(), // memberShipRules to  ethicsPolicy
  venues: z.array(z.string()).optional(),
  employeeCount: z.number(), /// as memberCount
})

export type Organizer = WithContext<Organization | Person>
