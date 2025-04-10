import type { Prisma } from '@prisma/client'
import type Stripe from 'stripe'

export function formatDate(dateString: string): string {
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

export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
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

export enum SubscriptionDuration {
  P1M = 'P1M',
  P3M = 'P3M',
  P6M = 'P6M',
  P1Y = 'P1Y',
  P1D = 'P1D',
  P1W = 'P1W',
}

export const SubscriptionDurationStripeRecurring: Record<
  SubscriptionDuration,
  Stripe.PriceCreateParams.Recurring
> = {
  P1D: {
    interval: 'day',
    interval_count: 1,
  },
  P1W: {
    interval: 'week',
    interval_count: 1,
  },
  P1M: {
    interval: 'month',
    interval_count: 1,
  },
  P3M: {
    interval: 'month',
    interval_count: 3,
  },
  P6M: {
    interval: 'month',
    interval_count: 6,
  },
  P1Y: {
    interval: 'year',
    interval_count: 1,
  },
}

export const getRecurring = (duration: SubscriptionDuration) => {
  return SubscriptionDurationStripeRecurring[duration]
}

export const subscriptionDurations: Record<SubscriptionDuration, string> = {
  P1D: 'Daily',
  P1W: 'Weekly',
  P1M: 'Monthly',
  P1Y: 'Yearly',
  P3M: 'Every 3 months',
  P6M: 'Every 6 months',
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
