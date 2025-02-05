import { type Organizer, validateOrganizers } from '~/schemas/organizers'

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

const mockOrganizers = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    id: '1',
    name: 'Berlin Salsa Community',
    email: 'ijakinhy@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],

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
      instagram: '@berlinsalsa',
      facebook: 'Berlin Salsa Community (3.5k members)',
      website: 'https://salsaberlin.de',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
    },
    privacy: 'public',
    admins: ['admin1', 'admin2'],
    mission: 'Promoting salsa and bachata in Berlin',
    regularActivities: ['Weekly socials', 'Workshops', 'Dance practice'],
  },
  {
    id: '2',
    name: 'Swing Dance Paris',
    email: 'ijakinhy@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
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
      telegram: 't.me/swingparis',
      instagram: '@swingdanceparis',
      facebook: 'Swing Dance Paris Official (2.8k members)',
    },
    features: {
      eventCalendar: true,
      photoGallery: true,
      communityUpdates: true,
    },
    privacy: 'public',
    admins: ['admin3', 'admin4'],
    mission: 'Bringing swing dance to Paris',
    regularActivities: ['Weekly classes', 'Social dances', 'Live music events'],
  },
  {
    id: '3',
    name: 'Tango Buenos Aires',
    email: 'ijakinhy@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
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
      instagram: '@tangoba',
      website: 'https://tangobuenosaires.org',
    },
  },
  {
    id: '4',
    name: 'NYC Urban Dance',
    email: 'ijakinhy@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
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
      discord: 'discord.gg/nycurbandance',
      instagram: '@nycurbandance',
      facebook: 'NYC Urban Dance Community (5k members)',
    },
  },
  {
    id: '5',
    name: 'Rio Zouk Movement',
    email: 'ijakinhy@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
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
      instagram: '@riozouk',
      facebook: 'Rio Zouk Official (4.2k members)',
      website: 'https://riozouk.com.br',
    },
  },
  {
    id: '6',
    name: 'Kizomba Lisboa',
    email: 'ijakinhy@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
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
      telegram: 't.me/kizombalisboa',
      instagram: '@kizombalisboa',
      facebook: 'Kizomba Lisboa (3.1k members)',
    },
  },
]

export const getMockOrganizers = (): Organizer[] => {
  return validateOrganizers(mockOrganizers)
}

export type { Organizer } from '~/schemas/organizers'
