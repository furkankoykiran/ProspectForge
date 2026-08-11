let scriptLoadingPromise: Promise<void> | null = null

export function useGoogleMapsScript() {
  const config = useRuntimeConfig()
  const available = computed(() => !!config.public.googleMapsBrowserKey)

  function load(): Promise<void> {
    if (window.google?.maps) return Promise.resolve()
    if (scriptLoadingPromise) return scriptLoadingPromise
    scriptLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsBrowserKey}`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Harita yüklenemedi'))
      document.head.appendChild(script)
    })
    return scriptLoadingPromise
  }

  return { load, available }
}
