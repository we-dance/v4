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


export const validateCommunity = (data: unknown): z.infer<typeof communitySchema> => {
  return communitySchema.parse(data);
};


export const validateCommunities = (data: unknown[]): z.infer<typeof communitySchema>[] => {
  return z.array(communitySchema).parse(data);
};


const danceStyleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const danceStylesSchema = z.array(danceStyleSchema);


const eventTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const eventTypesSchema = z.array(eventTypeSchema);


const organizerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().url(),
  memberCount: z.number().default(0),
  city: z.string(),
  styles: z.array(z.string()).optional(),
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

export const danceStylesData = [
  { value: "salsa", label: "Salsa" },
  { value: "bachata", label: "Bachata" },
  { value: "kizomba", label: "Kizomba" },
  { value: "zouk", label: "Zouk" },
  { value: "swing", label: "Swing" },
  { value: "tango", label: "Tango" },
  { value: "ballet", label: "Ballet" },
  { value: "contemporary", label: "Contemporary" },
].map((style) => ({
  id: style.value,
  name: style.label,
}));

export const eventTypesData = [
  { value: "socials", label: "Socials" },
  { value: "workshops", label: "Workshops" },
  { value: "festivals", label: "Festivals" },
  { value: "classes", label: "Classes" },
  { value: "performances", label: "Performances" },
].map((event) => ({
  id: event.value,
  name: event.label,
}));

export const organizersData = [
  {
    id: "1",
    name: "Berlin Salsa Community",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=800&fit=crop",
    styles: ["salsa", "bachata"],
    eventTypes: ["festivals", "workshops", "socials"],
    bio: "The main salsa & bachata community in Berlin. Join our WhatsApp group for daily socials and practice sessions.",
    eventCount: 45,
    links: {
      whatsapp: "https://chat.whatsapp.com/...",
      instagram: "@berlinsalsa",
      facebook: "Berlin Salsa Community (3.5k members)",
      website: "https://salsaberlin.de",
    },
  },
].map((organizer) => ({
  id: organizer.id,
  name: organizer.name,
  description: organizer.bio || '',
  image: organizer.avatar,
  memberCount: organizer.eventCount,
  city: organizer.location,
  styles: organizer.styles,
  schedule: undefined, 
  links: organizer.links,
  features: undefined, 
  privacy: 'public',
  admins: [],
  mission: undefined,
  guidelines: undefined,
  membershipRules: undefined,
  venues: undefined,
  regularActivities: undefined,
}));

const validatedDanceStyles = danceStylesSchema.parse(danceStylesData);
const validatedEventTypes = eventTypesSchema.parse(eventTypesData);
const validatedOrganizers = z.array(organizerSchema).parse(organizersData);

console.log(validatedDanceStyles, validatedEventTypes, validatedOrganizers);
