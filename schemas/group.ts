export interface Group {
  id: string
  name: string
  description: string
  location: string
  image?: string
  keywords: string[]
  event: string[]
  track: number
  employeeCount: number
  sameAs?: string[]
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
