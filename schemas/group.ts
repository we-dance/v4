export interface Group {
  id: string
  name: string
  bio: string
  location: string
  coverImage?: string
  styles: string[]
  eventTypes: string[]
  eventCount: number
  memberCount: number
  links?: {
    website?: string
    instagram?: string
    whatsapp?: string
    telegram?: string
  }
}

export const danceStyles = [
  { value: 'salsa', label: 'Salsa' },
  { value: 'bachata', label: 'Bachata' },
  { value: 'kizomba', label: 'Kizomba' },
  { value: 'zouk', label: 'Zouk' },
] as const

export const eventTypes = [
  { value: 'party', label: 'Party' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'festival', label: 'Festival' },
  { value: 'congress', label: 'Congress' },
] as const
