export interface Address{
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
}
    

export interface Review {
  name: string
  img_src: string | undefined
  date: string
  platform: string
  review_content: string
  rating: number
}
