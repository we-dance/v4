let googlePromise: Promise<any> | null = null

declare global {
  interface Window {
    google: any
  }
}

export function loadGoogleMapsApi(): Promise<any> {
  const apiKey = useRuntimeConfig().public.googleMapsApiKey

  if (!googlePromise) {
    googlePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.google) {
          resolve(window.google)
        } else {
          reject(new Error('Google Maps API failed to load.'))
        }
      }
      script.onerror = () =>
        reject(new Error('Failed to load the Google Maps API'))
      document.head.appendChild(script)
    })
  }
  return googlePromise
}
