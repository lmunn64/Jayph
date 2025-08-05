export interface Coordinates{
    city: string
    state: string
    latitude: string
    longitude: string
}

export interface Capacity{
    max: number
    bedrooms: number
    beds: Float16Array
    bathrooms: number
}

export interface HouseRules{
    pets_allowed: boolean | null
    smoking_allowed: boolean | null
    events_allowed: boolean | null
} 
    
export interface Details{
    space_overview: string | undefined
    guest_access: string | undefined
    other_details: string | undefined
    neighborhood_description: string | undefined
    getting_around: string | undefined
}

export interface Property{
    id: string
    name: string
    picture_url: string
    coordinates: Coordinates
    amenities: string[]
    description: string
    summary: string
    capacity: Capacity
    house_rules: HouseRules
    details: Details
}
    
export interface Property_wTotal{
   property: Property
   total_before_taxes: string
}
    
export interface Review {
    name: string
    img_src: string
    date: string
    platform: string
    review_content: string
    rating: Float16Array
}

export interface SearchedProperty {
  uuid: string
  total_before_taxes: number
}
