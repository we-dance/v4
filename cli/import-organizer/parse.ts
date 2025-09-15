export function isInstagramUrl(url: string): boolean {
  const s = url.trim()
  if (s.startsWith('@')) return true
  try {
    const u = new URL(/^[a-z]+:\/\//i.test(s) ? s : `https://${s}`)
    return (
      /(^|\.)instagram\.com$/i.test(u.hostname) ||
      /(^|\.)instagr\.am$/i.test(u.hostname)
    )
  } catch {
    return false
  }
}

export function extractInstagramUsername(url: string): string {
  const s = url.replace(/https?:\/\/(www\.)?instagram\.com\//i, '')
  return s
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '')
    .split('/')[0]
    .replace(/^@/, '')
}
