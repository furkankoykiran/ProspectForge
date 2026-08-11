import { incrementUsage, upsertBusinesses } from '../utils/db'
import { geocodeAddress, nearbySearch } from '../utils/places'
import type { DiscoverRequestBody } from '#shared/types/business'

export default defineEventHandler(async (event) => {
  const body = await readBody<DiscoverRequestBody>(event)
  const hasCoords = typeof body?.lat === 'number' && typeof body?.lng === 'number'
  if (!body?.location && !hasCoords) {
    throw createError({ statusCode: 400, statusMessage: 'location veya lat/lng zorunlu' })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'GOOGLE_MAPS_API_KEY tanımlı değil' })
  }

  const center = hasCoords
    ? { lat: body.lat as number, lng: body.lng as number }
    : await geocodeAddress(body.location as string, apiKey)
  const places = await nearbySearch(center, body.radiusMeters ?? 3000, body.category, apiKey)
  incrementUsage('discover')

  if (places.length === 0) {
    return { count: 0, message: 'Bu bölgede işletme bulunamadı.' }
  }

  upsertBusinesses(places)
  return { count: places.length }
})
