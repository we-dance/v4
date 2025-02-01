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
  socialLinks: mockArtist.socialMedia
    ? [
        ...(mockArtist.socialMedia.instagram
          ? [
              {
                platform: 'Instagram',
                url: `https://instagram.com/${mockArtist.socialMedia.instagram}`,
              },
            ]
          : []),
        ...(mockArtist.socialMedia.youtube
          ? [
              {
                platform: 'YouTube',
                url: `https://youtube.com/${mockArtist.socialMedia.youtube}`,
              },
            ]
          : []),
      ]
    : [],
  availability: mockArtist.availability,
  experience: {
    teachingLevels: mockArtist.experience?.teachingLevels,
    specialties: mockArtist.specialties,
    certifications: mockArtist.certifications,
  },
  stats: {
    followers: parseInt(mockArtist.followers.replace(/[^0-9]/g, '')),
    following: 0,
    events: 0,
    reviews: mockArtist.reviewCount,
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
