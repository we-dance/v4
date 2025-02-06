import type { ArtistProfile } from '~/schemas/profile'

export const adaptArtistToSchema = (mockArtist: any): ArtistProfile => ({
  id: String(mockArtist.id),
  name: mockArtist.name,
  email: `${mockArtist.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
  points: 1000,
  type: 'artist',
  roles: mockArtist.roles,
  languages: mockArtist.languages,
  styles: mockArtist.specialties,
  level: mockArtist.level,
  verified: true,
  location: mockArtist.location,
  bio: '',
  image: mockArtist.image,
  specialties: mockArtist.specialties,
  socialLinks: mockArtist.socialMedia
    ? [
        ...(mockArtist.socialMedia.instagram
          ? [
              {
                platform: 'Instagram',
                url: typeof mockArtist.socialMedia.instagram === 'string' && mockArtist.socialMedia.instagram.startsWith('http')
                  ? mockArtist.socialMedia.instagram
                  : `https://instagram.com/${mockArtist.socialMedia.instagram.replace('@', '')}`,
              },
            ]
          : []),
        ...(mockArtist.socialMedia.youtube
          ? [
              {
                platform: 'YouTube',
                url: typeof mockArtist.socialMedia.youtube === 'string' && mockArtist.socialMedia.youtube.startsWith('http')
                  ? mockArtist.socialMedia.youtube
                  : `https://youtube.com/${mockArtist.socialMedia.youtube.replace('@', '')}`,
              },
            ]
          : []),
      ]
    : [],
  availability: {
    ...mockArtist.availability,
    pricing: mockArtist.availability?.pricing
      ? {
          privateClass: mockArtist.availability.pricing.privateClass
            ? {
                amount: mockArtist.availability.pricing.privateClass.amount,
                currency: mockArtist.availability.pricing.privateClass.currency,
                duration: mockArtist.availability.pricing.privateClass.duration,
              }
            : undefined,
          workshop: mockArtist.availability.pricing.workshop
            ? {
                amount: mockArtist.availability.pricing.workshop.amount,
                currency: mockArtist.availability.pricing.workshop.currency,
                duration: mockArtist.availability.pricing.workshop.duration,
                note: mockArtist.availability.pricing.workshop.note,
              }
            : undefined,
        }
      : undefined,
  },
  experience: {
    teachingLevels: mockArtist.experience?.teachingLevels,
    specialties: mockArtist.specialties,
    certifications: mockArtist.certifications,
    years: mockArtist.experience?.years,
  },
  stats: {
    followers: parseInt(mockArtist.followers.replace(/[^0-9]/g, '')),
    following: 0,
    events: 0,
    reviews: mockArtist.reviewCount,
    rating: mockArtist.rating,
  },
  privacy: {
    profileVisibility: 'public',
    contactPreferences: {
      allowMessages: true,
      showEmail: false,
      showPhone: false,
    },
  },
  portfolio: [
    ...(mockArtist.image
      ? [
          {
            type: 'image' as const,
            url: mockArtist.image,
            description: `${mockArtist.name} profile photo`,
          },
        ]
      : []),
    ...(mockArtist.experience?.achievements?.map((achievement: string) => ({
      type: 'achievement' as const,
      url: 'https://example.com/achievement',
      description: achievement,
    })) || []),
  ],
})
