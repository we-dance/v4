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
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Person'],
    id: '1',
    url: 'https://salsaberlin.de/organizer/1',
    name: 'Berlin Salsa Community',
    email: 'info@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
    location: 'Berlin, Germany',
    logo: 'https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=400&h=400&fit=crop',
    image:
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=800&fit=crop',

    keywords: ['salsa', 'bachata'],
    event: ['festivals', 'workshops', 'socials'],
    description:
      'The main salsa & bachata community in Berlin. Join our WhatsApp group for daily socials and practice sessions.',
    track: 45,
    sameAs: [
      'https://chat.whatsapp.com/...',
      'https://instagram.com/berlinsalsa',
      'https://facebook.com/groups/berlinsalsa',

      'https://salsaberlin.de',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'eventCalendar',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'photoGallery',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'communityUpdates',
        value: true,
      },
    ],
    serviceArea: 'public',
    founder: ['admin1', 'admin2'],
    mainEntityOfPage: 'Promoting salsa and bachata in Berlin',
    makesOffer: ['Weekly socials', 'Workshops', 'Dance practice'],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Person'],
    id: '2',
    url: 'https://salsaberlin.de/organizer/2',
    name: 'Swing Dance Paris',
    email: 'info@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
    location: 'Paris, France',
    logo: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=400&h=400&fit=crop',
    image:
      'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=800&fit=crop',
    keywords: ['swing', 'jazz'],
    event: ['classes', 'socials'],
    description:
      'Weekly swing dance classes and social dances. Follow us on Instagram for latest updates and join our Telegram channel.',
    track: 32,
    sameAs: [
      'https://t.me/swingparis',
      'https://instagram.com/swingdanceparis',
      'https://facebook.com/groups/swingdanceparis',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'eventCalendar',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'photoGallery',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'communityUpdates',
        value: true,
      },
    ],
    serviceArea: 'public',
    founder: ['admin3', 'admin4'],
    mainEntityOfPage: 'Bringing swing dance to Paris',
    makesOffer: ['Weekly classes', 'Social dances', 'Live music events'],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Person'],
    id: '3',
    url: 'https://salsaberlin.de/organizer/3',
    name: 'Tango Buenos Aires',
    email: 'info@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
    location: 'Buenos Aires, Argentina',
    logo: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=400&fit=crop',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=800&fit=crop',
    keywords: ['tango'],
    event: ['socials', 'performances'],
    description:
      'Daily milongas and tango events. Join our WhatsApp group for real-time updates on milonga locations and special events.',
    track: 128,
    sameAs: [
      'https://chat.whatsapp.com/...',
      'https://instagram.com/tangoba',
      'https://tangobuenosaires.org',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'eventCalendar',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'photoGallery',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'communityUpdates',
        value: true,
      },
    ],

    serviceArea: 'public',
    founder: ['admin5', 'admin6'],
    mainEntityOfPage: 'Promoting tango culture in Buenos Aires',
    makesOffer: ['Daily milongas', 'Tango shows', 'Practice sessions'],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Person'],
    id: '4',
    url: 'https://salsaberlin.de/organizer/4',
    name: 'NYC Urban Dance',
    email: 'info@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
    location: 'New York, USA',
    logo: 'https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?w=400&h=400&fit=crop',
    image:
      'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=1200&h=800&fit=crop',
    keywords: ['contemporary', 'ballet'],
    event: ['performances', 'workshops', 'classes'],
    description:
      'Contemporary dance community in NYC. Join our Discord for class schedules and practice sessions.',
    track: 67,
    sameAs: [
      'https://discord.gg/nycurbandance',
      'https://www.instagram.com/nycurbandance',
      'https://www.facebook.com/NYCUrbanDanceCommunity',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'eventCalendar',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'photoGallery',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'communityUpdates',
        value: true,
      },
    ],
    serviceArea: 'public',
    founder: ['admin7', 'admin8'],
    mainEntityOfPage: 'Advancing contemporary dance in NYC',
    makesOffer: ['Weekly classes', 'Performances', 'Workshops'],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Person'],
    id: '5',
    url: 'https://salsaberlin.de/organizer/5',
    name: 'Rio Zouk Movement',
    email: 'info@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
    location: 'Rio de Janeiro, Brazil',
    logo: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=400&fit=crop',
    image:
      'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?w=1200&h=800&fit=crop',
    keywords: ['zouk', 'salsa'],
    event: ['festivals', 'workshops'],
    description:
      'The largest Brazilian Zouk community in Rio. Daily classes and weekend parties. Join our WhatsApp for practice partners.',
    track: 89,
    sameAs: [
      'https://chat.whatsapp.com/',
      'https://www.instagram.com/riozouk',
      'https://www.riozouk.com.br',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'eventCalendar',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'photoGallery',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'communityUpdates',
        value: true,
      },
    ],
    serviceArea: 'public',
    founder: ['admin9', 'admin10'],
    mainEntityOfPage: 'Spreading Brazilian Zouk worldwide',
    makesOffer: ['Daily classes', 'Weekend parties', 'Workshops'],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Person'],
    id: '6',
    url: 'https://salsaberlin.de/organizer/6',
    name: 'Kizomba Lisboa',
    email: 'info@gmail.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+4930123456789',
        email: 'contact@salsaberlin.de',
        contactType: 'customer support',
      },
    ],
    location: 'Lisbon, Portugal',
    logo: 'https://images.unsplash.com/photo-1523307730650-594bc63f9d67?w=400&h=400&fit=crop',
    image:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&h=800&fit=crop',
    keywords: ['kizomba'],
    event: ['festivals', 'workshops', 'classes'],
    description:
      'Authentic Kizomba community in Lisbon. Join our groups for daily socials and beach dance events.',
    track: 54,
    sameAs: [
      'https://chat.whatsapp.com/',
      'https://t.me/kizombalisboa',
      'https://www.instagram.com/kizombalisboa',
      'https://www.facebook.com/KizombaLisboa',
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'eventCalendar',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'photoGallery',
        value: true,
      },
      {
        '@type': 'PropertyValue',
        name: 'communityUpdates',
        value: true,
      },
    ],
    serviceArea: 'public',
    founder: ['admin11', 'admin12'],
    mainEntityOfPage: 'Preserving authentic Kizomba culture',
    makesOffer: ['Beach dance events', 'Workshops', 'Social parties'],
  },
]

export const mockOrganizers = organizersData

export type { Organizer } from '~/schemas/organizers'
