import { format } from 'date-fns'

export const formatDateOld = (
  date: Date,
  formatStr: string,
  locale: string
) => {
  return format(date, formatStr)
}
