export function isInstagramUrl(url: string): boolean {
  const username = extractInstagramUsername(url)
  return username.length > 0
}

export function extractInstagramUsername(input: string): string {
  const raw = input.trim()

  // Quick path: "@user" → "user"
  if (raw.startsWith('@')) {
    const username = raw.replace(/^@+/, '').split(/[/?#]/, 1)[0]
    return isValidInstagramUsername(username) ? username : ''
  }

  try {
    // Add https:// if no protocol present
    const urlString = /^[a-z]+:\/\//i.test(raw) ? raw : `https://${raw}`
    const u = new URL(urlString)
    const host = u.hostname

    // Check if it's an Instagram domain
    const isIg =
      /(^|\.)instagram\.com$/i.test(host) || /(^|\.)instagr\.am$/i.test(host)
    if (!isIg) return ''

    // Parse pathname
    const parts = u.pathname
      .replace(/^\/+|\/+$/g, '')
      .split('/')
      .filter(Boolean)
    let candidate = (parts[0] || '').replace(/^@+/, '')

    // Handle /_u/username deep-links
    if (/^_u$/i.test(candidate) && parts.length > 1) {
      candidate = parts[1].replace(/^@+/, '')
    }

    // Guard against reserved routes
    if (
      !candidate ||
      /^(p|reel|reels|tv|stories|explore|accounts|tags|about|help|legal|privacy|terms|challenge|web|directory|login|developer)$/i.test(
        candidate
      )
    ) {
      return ''
    }

    return isValidInstagramUsername(candidate) ? candidate : ''
  } catch {
    // Fallback: treat as bare username
    const username = raw.replace(/^@+/, '').split(/[/?#]/, 1)[0]
    return isValidInstagramUsername(username) ? username : ''
  }
}

function isValidInstagramUsername(username: string): boolean {
  if (!username || username.length === 0) return false
  if (username.length > 30) return false // Instagram username limit

  // Instagram usernames can only contain letters, numbers, periods, and underscores
  // Cannot start or end with a period
  // Cannot have consecutive periods
  const validPattern = /^[a-zA-Z0-9_]([a-zA-Z0-9_.]*[a-zA-Z0-9_])?$/
  const hasConsecutivePeriods = /\.\./.test(username)

  return validPattern.test(username) && !hasConsecutivePeriods
}
