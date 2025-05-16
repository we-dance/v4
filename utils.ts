import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isToday, isTomorrow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDateObect = (val) => {
  let date

  if (!val) {
    return null
  }

  if (Object.prototype.toString.call(val) === '[object Date]') {
    if (isNaN(val)) {
      return null
    }
  }

  if (typeof val.toDate === 'function') {
    date = val.toDate()
  } else {
    date = new Date(val)
  }

  return date
}

export const formatDate = (val, formatStr, locale) => {
  if (!val) {
    return ''
  }

  const date = getDateObect(val)

  if (!date) {
    return ''
  }

  const options = {}

  // if (dateLocales[locale]) {
  //   options = { locale: dateLocales[locale] }
  // }

  return format(date, formatStr, options)
}

export const getYmd = (val, locale) => {
  return formatDate(val, 'yyyy-MM-dd', locale)
}

export const getDay = (val, locale) => {
  return formatDate(val, 'iiii', locale)
}

export const getDateTime = (val: any, locale = 'en') => {
  return formatDate(val, 'dd MMM yyyy, HH:mm', locale)
}

export const getDate = (val: any, locale?: string): string => {
  const date = getDateObect(val)
  if (!date) return ''
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  return formatDate(date, 'd MMM', locale)
}

export const getDateFull = (val: any, locale?: string): string => {
  const date = getDateObect(val)
  if (!date) return ''
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  return formatDate(date, 'd MMM yyyy', locale)
}

export const getTime = (val, locale) => {
  return formatDate(val, 'HH:mm', locale)
}
