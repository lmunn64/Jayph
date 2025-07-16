export interface Address{
    street: string
    city: string
    state: string
    country: string
    postcode: string
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
    address: Address
    amenities: string[]
    description: string
    summary: string
    capacity: Capacity
    house_rules: HouseRules
    details: Details
}
    

export interface Review {
    name: string
    img_src: string
    date: string
    platform: string
    review_content: string
    rating: number
}
