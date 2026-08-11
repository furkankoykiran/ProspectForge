import { describe, expect, it } from 'vitest'
import type { BusinessStatus } from '#shared/types/business'
import { STATUS_BADGE_CLASSES, STATUS_HEX, STATUS_LABELS } from '../app/utils/status'

// Mirrors the union in shared/types/business.ts. Kept explicit so that adding a
// status to the union without adding its presentation entries fails here.
const ALL_STATUSES: BusinessStatus[] = ['discovered', 'processed', 'visited', 'won', 'lost']

describe('status presentation maps', () => {
  it.each([
    ['STATUS_LABELS', STATUS_LABELS],
    ['STATUS_BADGE_CLASSES', STATUS_BADGE_CLASSES],
    ['STATUS_HEX', STATUS_HEX],
  ])('%s covers every status exactly once', (_name, map) => {
    expect(Object.keys(map).sort()).toEqual([...ALL_STATUSES].sort())
  })

  it('has a non-empty label for every status', () => {
    for (const status of ALL_STATUSES) {
      expect(STATUS_LABELS[status].trim()).not.toBe('')
    }
  })
})

describe('STATUS_HEX', () => {
  it('uses valid six-digit hex colours', () => {
    for (const status of ALL_STATUSES) {
      expect(STATUS_HEX[status]).toMatch(/^#[0-9a-f]{6}$/)
    }
  })

  it('gives each status a distinct colour so map markers stay distinguishable', () => {
    const colours = ALL_STATUSES.map(s => STATUS_HEX[s])
    expect(new Set(colours).size).toBe(colours.length)
  })

  it('avoids the amber accent reserved for interactive elements', () => {
    // Status pills deliberately sit off the accent colour so "this is a state"
    // never reads as "this is clickable".
    for (const status of ALL_STATUSES) {
      expect(STATUS_HEX[status]).not.toMatch(/^#f59e0b$/i)
    }
  })
})
