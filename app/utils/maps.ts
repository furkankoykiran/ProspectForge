interface MapLinkable {
  name: string
  place_id: string
  lat: number | null
  lng: number | null
}

// Google's documented Maps URLs scheme (no API key, no cost) — opens the exact
// place if we have its place_id, falls back to raw coordinates.
export function googleMapsUrl(business: MapLinkable): string {
  const query = business.lat != null && business.lng != null
    ? `${business.lat},${business.lng}`
    : encodeURIComponent(business.name)
  return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${business.place_id}`
}
