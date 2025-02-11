import { type Organizer } from '~/schemas/organizers'

export const danceStyles = [
  { value: 'salsa', label: 'Salsa' },
  { value: 'bachata', label: 'Bachata' },
  { value: 'kizomba', label: 'Kizomba' },
  { value: 'zouk', label: 'Zouk' },
  { value: 'swing', label: 'Swing' },
  { value: 'tango', label: 'Tango' },
  { value: 'ballet', label: 'Ballet' },
  { value: 'contemporary', label: 'Contemporary' },
]

export const eventTypes = [
  { value: 'socials', label: 'Socials' },
  { value: 'workshops', label: 'Workshops' },
  { value: 'festivals', label: 'Festivals' },
  { value: 'classes', label: 'Classes' },
  { value: 'performances', label: 'Performances' },
]

const organizersData: Organizer[] = [
  {
    id: '1',
    name: 'Berlin Salsa Community',
    location: 'Berlin, Germany',
    avatar:
      'https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=400&h=400&fit=crop',
    coverImage:
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=800&fit=crop',
    styles: ['salsa', 'bachata'],
    eventTypes: ['festivals', 'workshops', 'socials'],
    bio: 'The main salsa & bachata community in Berlin. Join our WhatsApp group for daily socials and practice sessions.',
    eventCount: 45,
    links: {
      whatsapp: 'https://chat.whatsapp.com/...',
      instagram: 'https://instagram.com/berlinsalsa',
      facebook: 'https://facebook.com/groups/berlinsalsa',
      website: 'https://salsaberlin.de',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
      memberDirectory: true,
      discussionBoard: true,
    },
    privacy: 'public',
    admins: ['admin1', 'admin2'],
    mission: 'Promoting salsa and bachata in Berlin',
    regularActivities: ['Weekly socials', 'Workshops', 'Dance practice'],
  },
  {
    id: '2',
    name: 'Swing Dance Paris',
    location: 'Paris, France',
    avatar:
      'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=400&h=400&fit=crop',
    coverImage:
      'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=800&fit=crop',
    styles: ['swing', 'jazz'],
    eventTypes: ['classes', 'socials'],
    bio: 'Weekly swing dance classes and social dances. Follow us on Instagram for latest updates and join our Telegram channel.',
    eventCount: 32,
    links: {
      telegram: 'https://t.me/swingparis',
      instagram: 'https://instagram.com/swingdanceparis',
      facebook: 'https://facebook.com/groups/swingdanceparis',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
      memberDirectory: true,
      discussionBoard: true,
    },
    privacy: 'public',
    admins: ['admin3', 'admin4'],
    mission: 'Bringing swing dance to Paris',
    regularActivities: ['Weekly classes', 'Social dances', 'Live music events'],
  },
  {
    id: '3',
    name: 'Tango Buenos Aires',
    location: 'Buenos Aires, Argentina',
    avatar:
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=400&fit=crop',
    coverImage:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop',
    styles: ['tango'],
    eventTypes: ['socials', 'performances'],
    bio: 'Daily milongas and tango events. Join our WhatsApp group for real-time updates on milonga locations and special events.',
    eventCount: 128,
    links: {
      whatsapp: 'https://chat.whatsapp.com/...',
      instagram: 'https://instagram.com/tangoba',
      website: 'https://tangobuenosaires.org',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
      memberDirectory: true,
      discussionBoard: true,
    },
    privacy: 'public',
    admins: ['admin5', 'admin6'],
    mission: 'Promoting tango culture in Buenos Aires',
    regularActivities: ['Daily milongas', 'Tango shows', 'Practice sessions'],
  },
  {
    id: '4',
    name: 'NYC Urban Dance',
    location: 'New York, USA',
    avatar:
      'https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?w=400&h=400&fit=crop',
    coverImage:
      'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=1200&h=800&fit=crop',
    styles: ['contemporary', 'ballet'],
    eventTypes: ['performances', 'workshops', 'classes'],
    bio: 'Contemporary dance community in NYC. Join our Discord for class schedules and practice sessions.',
    eventCount: 67,
    links: {
      discord: 'https://discord.gg/nycurbandance',
      instagram: 'https://instagram.com/nycurbandance',
      facebook: 'https://facebook.com/groups/nycurbandance',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
      memberDirectory: true,
      discussionBoard: true,
    },
    privacy: 'public',
    admins: ['admin7', 'admin8'],
    mission: 'Advancing contemporary dance in NYC',
    regularActivities: ['Weekly classes', 'Performances', 'Workshops'],
  },
  {
    id: '5',
    name: 'Rio Zouk Movement',
    location: 'Rio de Janeiro, Brazil',
    avatar:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=400&fit=crop',
    coverImage:
      'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?w=1200&h=800&fit=crop',
    styles: ['zouk', 'salsa'],
    eventTypes: ['festivals', 'workshops'],
    bio: 'The largest Brazilian Zouk community in Rio. Daily classes and weekend parties. Join our WhatsApp for practice partners.',
    eventCount: 89,
    links: {
      whatsapp: 'https://chat.whatsapp.com/...',
      instagram: 'https://instagram.com/riozouk',
      facebook: 'https://facebook.com/groups/riozouk',
      website: 'https://riozouk.com.br',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
      memberDirectory: true,
      discussionBoard: true,
    },
    privacy: 'public',
    admins: ['admin9', 'admin10'],
    mission: 'Spreading Brazilian Zouk worldwide',
    regularActivities: ['Daily classes', 'Weekend parties', 'Workshops'],
  },
  {
    id: '6',
    name: 'Kizomba Lisboa',
    location: 'Lisbon, Portugal',
    avatar:
      'https://images.unsplash.com/photo-1523307730650-594bc63f9d67?w=400&h=400&fit=crop',
    coverImage:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&h=800&fit=crop',
    styles: ['kizomba'],
    eventTypes: ['festivals', 'workshops', 'classes'],
    bio: 'Authentic Kizomba community in Lisbon. Join our groups for daily socials and beach dance events.',
    eventCount: 54,
    links: {
      whatsapp: 'https://chat.whatsapp.com/...',
      telegram: 'https://t.me/kizombalisboa',
      instagram: 'https://instagram.com/kizombalisboa',
      facebook: 'https://facebook.com/groups/kizombalisboa',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
      memberDirectory: true,
      discussionBoard: true,
    },
    privacy: 'public',
    admins: ['admin11', 'admin12'],
    mission: 'Preserving authentic Kizomba culture',
    regularActivities: ['Beach dance events', 'Workshops', 'Social parties'],
  },
]

export const mockOrganizers = organizersData

export type { Organizer } from '~/schemas/organizers'
