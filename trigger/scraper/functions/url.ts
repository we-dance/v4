import axios from 'axios'

export async function getRedirectedUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url)
    return response.request.res.responseUrl || url
  } catch (error) {
    console.error('Failed to get redirected url', { url, error })
    return url
  }
}
