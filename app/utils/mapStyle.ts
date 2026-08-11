// Shared between the discover pin-picker and the /map overview so both
// start centered on the same area instead of one defaulting to all of Turkey.
export const DEFAULT_MAP_CENTER = { lat: 39.9334, lng: 32.8597 } // Ankara
export const DEFAULT_MAP_ZOOM = 12

// Google Maps renders its own light UI by default. This is a widely-used
// "night mode" style array (Google's own dark map style guide) applied to
// every embedded map so it matches the rest of the dark UI.
export const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8b8b92' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d4d4d8' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#8b8b92' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#26262b' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#5c5c63' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2b2b30' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1a1a1e' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8b8b92' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3a3a40' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1a1a1e' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#d4a94e' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2b2b30' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#5c5c63' }] },
]
