export type BusinessStatus = 'discovered' | 'processed' | 'visited' | 'won' | 'lost'

export interface ReviewSnippet {
  author: string
  rating: number
  text: string
}

export interface ProductIdea {
  title: string
  description: string
  price_estimate: string
  needs_cms: boolean
  build_prompt: string
}

export interface Business {
  id: number
  place_id: string
  name: string
  category: string | null
  address: string | null
  phone: string | null
  website_url: string | null
  rating: number | null
  review_count: number | null
  lat: number | null
  lng: number | null
  reviews_json: string | null
  status: BusinessStatus
  profile_md: string | null
  pitch_script_md: string | null
  ideas_json: string | null
  discovered_at: string
  processed_at: string | null
}

export interface DiscoveredBusiness {
  place_id: string
  name: string
  category: string | null
  address: string | null
  phone: string | null
  website_url: string | null
  rating: number | null
  review_count: number | null
  lat: number | null
  lng: number | null
  reviews_json: string | null
}

export interface DiscoverRequestBody {
  location?: string
  lat?: number
  lng?: number
  radiusMeters?: number
  category?: string
}

export interface ProcessResultBody {
  profile_md: string
  pitch_script_md: string
  ideas: ProductIdea[]
}
