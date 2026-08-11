import { describe, expect, it } from 'vitest'
import { googleMapsUrl } from '../app/utils/maps'

const base = { name: 'Test İşletme', place_id: 'ChIJtest123', lat: null, lng: null }

describe('googleMapsUrl', () => {
  it('prefers exact coordinates when they are known', () => {
    const url = googleMapsUrl({ ...base, lat: 41.0082, lng: 28.9784 })
    expect(url).toBe(
      'https://www.google.com/maps/search/?api=1&query=41.0082,28.9784&query_place_id=ChIJtest123',
    )
  })

  it('falls back to the business name when coordinates are missing', () => {
    const url = googleMapsUrl(base)
    expect(url).toContain('query=Test%20%C4%B0%C5%9Fletme')
    expect(url).not.toContain('query=null')
  })

  it('falls back when only one coordinate is present', () => {
    // A half-known position would produce a nonsense pin, so it must not be used.
    expect(googleMapsUrl({ ...base, lat: 41.0082 })).toContain('query=Test%20')
    expect(googleMapsUrl({ ...base, lng: 28.9784 })).toContain('query=Test%20')
  })

  it('treats zero coordinates as valid rather than falsy', () => {
    // Null Island is a real coordinate; `!lat` would wrongly discard it.
    expect(googleMapsUrl({ ...base, lat: 0, lng: 0 })).toContain('query=0,0')
  })

  it('percent-encodes names that would otherwise break the query string', () => {
    const url = googleMapsUrl({ ...base, name: 'Ali & Veli Kuaför #1' })
    expect(url).toContain('Ali%20%26%20Veli')
    expect(url).toContain('%231')
  })

  it('always carries the place_id so Google resolves the exact place', () => {
    expect(googleMapsUrl(base)).toContain('query_place_id=ChIJtest123')
    expect(googleMapsUrl({ ...base, lat: 1, lng: 2 })).toContain('query_place_id=ChIJtest123')
  })
})
