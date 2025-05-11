import type { DanceStyle, City } from '@prisma/client'

export type Community = DanceStyle & {
  cities: City[]
  _count: {
    posts: number
  }
}
