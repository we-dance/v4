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
    '@type': ['Organization'],
    '@id': 'https://salsaberlin.de/organizer/1',
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
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'Germany',
    },
    logo: 'https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=800&fit=crop',
    knowsAbout: ['salsa', 'bachata'],
    hasEvent: [
      {
        '@type': 'Event',
        name: 'Festival',
        startDate: '2025-03-01T12:00:00Z',
        location: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Berlin',
            addressCountry: 'Germany',
          },
        },
      },
    ],
    description: 'The main salsa & bachata community in Berlin. Join our WhatsApp group for daily socials and practice sessions.',
    eventCount: 45,
    sameAs: [
      'https://chat.whatsapp.com/...',
      'https://www.instagram.com/berlinsalsa',
      'https://www.facebook.com/BerlinSalsaCommunity',
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
    privacy: 'public',
    founder: ['admin1', 'admin2'],
    about: 'Promoting salsa and bachata in Berlin',
    offers: ['Weekly socials', 'Workshops', 'Dance practice'],
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization'],
    '@id': 'https://swingparis.com/organizer/2',
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
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'France',
    },
    logo: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=800&fit=crop',
    knowsAbout: ['swing', 'jazz'],
    hasEvent: [
      {
        '@type': 'Event',
        name: 'Swing Workshop',
        startDate: '2025-04-01T14:00:00Z',
        location: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressCountry: 'France',
          },
        },
      },
    ],
    description: 'Weekly swing dance classes and social dances. Follow us on Instagram for latest updates and join our Telegram channel.',
    eventCount: 32,
    sameAs: [
      'https://t.me/swingparis',
      'https://www.instagram.com/swingdanceparis',
      'https://www.facebook.com/SwingDanceParisOfficial',
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
    privacy: 'public',
    founder: ['admin3', 'admin4'],
    about: 'Bringing swing dance to Paris',
    offers: ['Weekly classes', 'Social dances', 'Live music events'],
  },
  // Repeat for other organizers as per the structure
]

export const getMockOrganizers = (): Organizer[] => {
  return validateOrganizers(mockOrganizers)
}

export type { Organizer } from '~/schemas/organizers'
