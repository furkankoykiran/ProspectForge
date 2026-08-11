import type { BusinessStatus } from '#shared/types/business'

export const STATUS_LABELS: Record<BusinessStatus, string> = {
  discovered: 'Yeni',
  processed: 'İşlendi',
  visited: 'Ziyaret Edildi',
  won: 'Kazanıldı',
  lost: 'Kaybedildi',
}

// Kept off amber on purpose — amber is the app's single accent color
// (buttons, active nav, links), so status pills use a separate palette to
// stay visually distinct from "this is clickable/primary".
export const STATUS_BADGE_CLASSES: Record<BusinessStatus, string> = {
  discovered: 'bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20',
  processed: 'bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/20',
  visited: 'bg-cyan-500/10 text-cyan-400 ring-1 ring-inset ring-cyan-500/20',
  won: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20',
  lost: 'bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20',
}

// Hex equivalents for contexts that can't use Tailwind classes — Google Maps
// marker icons and the inline InfoWindow HTML on the map page.
export const STATUS_HEX: Record<BusinessStatus, string> = {
  discovered: '#60a5fa',
  processed: '#a78bfa',
  visited: '#22d3ee',
  won: '#34d399',
  lost: '#f87171',
}
