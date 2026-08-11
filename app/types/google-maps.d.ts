/// <reference types="google.maps" />

// The Maps JavaScript API is injected at runtime by useGoogleMapsScript(), so
// `window.google` is genuinely absent until that script resolves. Declaring it
// optional keeps that fact in the type system instead of hiding it behind a
// cast, and forces callers to guard before touching it.
declare global {
  interface Window {
    google?: typeof google
  }
}

export {}
