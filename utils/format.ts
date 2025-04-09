import type { Prisma } from '@prisma/client'

export function formatDate(dateString: string): string {
  if (dateString.toLowerCase().includes('every')) {
    return dateString
  }

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)
  } catch {
    return dateString
  }
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyCents(amount: number, currency: string): string {
  return formatCurrency(amount / 100, currency)
}

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60
  return `${hours > 0 ? `${hours}h` : ''} ${minutes > 0 ? `${minutes}m` : ''} ${seconds > 0 ? `${seconds}s` : ''}`
}

export const subscriptionDurations = {
  P1M: '1 month',
  P3M: '3 months',
  P6M: '6 months',
  P1Y: '1 year',
}

export const formatSubscriptionDuration = (duration: string) => {
  return subscriptionDurations[duration as keyof typeof subscriptionDurations]
}

export const getMinPrice = (offers: Prisma.OfferGetPayload<{}>[]) => {
  if (!offers?.length) {
    return 'Contact for pricing'
  }

  const minOffer = offers.reduce((min, offer) => {
    return offer.price < min.price ? offer : min
  }, offers[0])

  return formatCurrencyCents(minOffer.price, minOffer.currency)
}
