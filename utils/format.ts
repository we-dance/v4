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
