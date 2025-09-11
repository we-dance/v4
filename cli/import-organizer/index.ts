//import will be here for  instagram improt function

export async function fetchOrganizer(soruceUrl: string) {
  if (isInstagramUrl(soruceUrl)) {
    // retrun getInstagramProfile(sourceUrl)
  }
}

function isInstagramUrl(url: string): boolean {
  return url.includes('instagram.com/')
}

export function extractInstagramUsername(url: string): string {
  return url
    .replace(/https?:\/\/(www\.)?instagram\.com\//, '')
    .replace(/\/$/, '')
    .split('/')[0]
}
