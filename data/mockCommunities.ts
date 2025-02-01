import { communitySchema, type Community } from '~/schemas/community'

// Define mock communities data without export
const communitiesData = [
  {
    id: 'afro-cuban-festivals',
    name: 'Afro Cuban Festivals',
    description:
      'International community coordinating festival trips across Germany and Europe',
    image:
      'https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80',
    memberCount: 2500,
    city: 'International',
    style: 'Cuban',
    links: {
      whatsapp: 'https://chat.whatsapp.com/xyz',
    },
  },
  {
    id: 'salsa-cubana-munich',
    name: 'Salsa Cubana Munich',
    description:
      "Munich's vibrant Cuban Salsa community, focused on Timba music and social dancing",
    image:
      'https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80',
    schedule: {
      summer: ['Wednesdays & Fridays: Open Air at Pinakothek der Moderne'],
      winter: ['Wednesdays: Kult Dance Studio'],
    },
    memberCount: 500,
    city: 'Munich',
  },
]

// Export validated communities
export const mockCommunities = communitySchema.array().parse(communitiesData)

// Export type for TypeScript support
export type MockCommunities = typeof mockCommunities
