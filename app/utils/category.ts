// Google Places (New) type strings -> Turkish label + icon group.
// https://developers.google.com/maps/documentation/places/web-service/place-types
// Icon names correspond to AppIcon.vue — grouped into broad visual buckets
// rather than one icon per exact Google type (there are ~40 of those).
export type CategoryIconName = 'food' | 'lodging' | 'venue' | 'shopping' | 'health' | 'briefcase' | 'wrench' | 'building'

const CATEGORY_META: Record<string, { label: string; icon: CategoryIconName }> = {
  restaurant: { label: 'Restoran', icon: 'food' },
  cafe: { label: 'Kafe', icon: 'food' },
  coffee_shop: { label: 'Kahveci', icon: 'food' },
  bakery: { label: 'Fırın', icon: 'food' },
  kebab_shop: { label: 'Kebapçı', icon: 'food' },
  bar: { label: 'Bar', icon: 'food' },
  night_club: { label: 'Gece Kulübü', icon: 'food' },

  hotel: { label: 'Otel', icon: 'lodging' },

  wedding_venue: { label: 'Düğün Salonu', icon: 'venue' },
  movie_theater: { label: 'Sinema', icon: 'venue' },
  amusement_park: { label: 'Eğlence Parkı', icon: 'venue' },

  shopping_mall: { label: 'AVM', icon: 'shopping' },
  grocery_store: { label: 'Market', icon: 'shopping' },
  food_store: { label: 'Gıda Mağazası', icon: 'shopping' },
  home_goods_store: { label: 'Ev Eşyası Mağazası', icon: 'shopping' },
  furniture_store: { label: 'Mobilya Mağazası', icon: 'shopping' },
  warehouse_store: { label: 'Toptan Market', icon: 'shopping' },
  clothing_store: { label: 'Giyim Mağazası', icon: 'shopping' },
  electronics_store: { label: 'Elektronik Mağazası', icon: 'shopping' },
  jewelry_store: { label: 'Kuyumcu', icon: 'shopping' },
  pet_store: { label: 'Petshop', icon: 'shopping' },
  florist: { label: 'Çiçekçi', icon: 'shopping' },
  book_store: { label: 'Kitapçı', icon: 'shopping' },
  car_dealer: { label: 'Oto Galeri', icon: 'shopping' },

  hospital: { label: 'Hastane', icon: 'health' },
  dentist: { label: 'Diş Hekimi', icon: 'health' },
  doctor: { label: 'Doktor', icon: 'health' },
  pharmacy: { label: 'Eczane', icon: 'health' },

  corporate_office: { label: 'Ofis', icon: 'briefcase' },
  government_office: { label: 'Devlet Dairesi', icon: 'briefcase' },
  local_government_office: { label: 'Belediye', icon: 'briefcase' },
  lawyer: { label: 'Avukat', icon: 'briefcase' },
  real_estate_agency: { label: 'Emlak', icon: 'briefcase' },
  insurance_agency: { label: 'Sigorta Acentesi', icon: 'briefcase' },
  travel_agency: { label: 'Seyahat Acentesi', icon: 'briefcase' },
  bank: { label: 'Banka', icon: 'briefcase' },
  association_or_organization: { label: 'Dernek/Kurum', icon: 'briefcase' },

  car_repair: { label: 'Oto Tamirci', icon: 'wrench' },
  service: { label: 'Hizmet', icon: 'wrench' },
  hair_care: { label: 'Kuaför', icon: 'wrench' },
  hair_salon: { label: 'Kuaför', icon: 'wrench' },
  beauty_salon: { label: 'Güzellik Salonu', icon: 'wrench' },
  gym: { label: 'Spor Salonu', icon: 'wrench' },
}

// categoryOptionsList() dedupes by label so aliases (e.g. hair_care /
// hair_salon both meaning "Kuaför") don't produce two identical dropdown
// entries — only one value per distinct label is kept.

function humanize(raw: string): string {
  return raw.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function categoryLabel(category: string | null): string {
  if (!category) return 'Diğer'
  return CATEGORY_META[category]?.label ?? humanize(category)
}

export function categoryIconName(category: string | null): CategoryIconName {
  if (!category) return 'building'
  return CATEGORY_META[category]?.icon ?? 'building'
}

/** Curated subset of Google Place Types (New) offered in the discovery
 * category dropdown, sorted alphabetically by Turkish label. */
export function categoryOptionsList(): Array<{ value: string; label: string }> {
  const seenLabels = new Set<string>()
  const options: Array<{ value: string; label: string }> = []
  for (const [value, meta] of Object.entries(CATEGORY_META)) {
    if (seenLabels.has(meta.label)) continue
    seenLabels.add(meta.label)
    options.push({ value, label: meta.label })
  }
  return options.sort((a, b) => a.label.localeCompare(b.label, 'tr'))
}
