import { defineStore } from 'pinia'
import type { Calendar } from '~/types/calendar'
import type { Property, Review } from '~/types/property'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [] as Property[],
    isLoaded: false,
    
    property_reviews: {} as Record<string, Review[]>,

    property_images: {} as Record<string, string[]>,
    property_images_loading: {} as Record<string, boolean>,
    
  }),
  actions: {
    async fetchProperties() {
      if (this.isLoaded) {
        return
      }
      try {
        console.log("fetching properties from api gateway")
        const properties = await $fetch<Property[]>('https://9un9op31m7.execute-api.eu-north-1.amazonaws.com/dev/api_properties')
        this.properties = properties.map((el) => ({
          id: el.id,
          name: el.name,
          picture_url: el.picture_url,
          address: {
            street: el.address.street,
            city: el.address.city,
            state: el.address.state,
            country: el.address.country,
            postcode: el.address.postcode,
          },
          amenities: el.amenities,
          description: el.description,
          summary: el.summary,
          capacity: {
            max: el.capacity.max,
            bedrooms: el.capacity.bedrooms,
            beds: el.capacity.beds,
            bathrooms: el.capacity.bathrooms,
          },
          house_rules: {
            pets_allowed: el.house_rules.pets_allowed,
            smoking_allowed: el.house_rules.smoking_allowed,
            events_allowed: el.house_rules.events_allowed,
          },
          details : {
            space_overview: el.details.space_overview,
            guest_access: el.details.guest_access,
            other_details: el.details.other_details,
            neighborhood_description: el.details.neighborhood_description,
            getting_around: el.details.getting_around
          }
        }))
        this.isLoaded = true
      } catch (error) {
        console.error("Error fetching properties:", error)
        this.isLoaded = false
        // set an error state or message here
      }
    },
    // use for later when reviews are set by Jaymi for the front page, use it the same on
    // the property page ([id].vue) as we do when loading properties on the index.vue.
    // we want to pass the values from pages to components, not fetch from components.
    // especially in onMounted calls, as it is not good for caching and server side rendering
    // for example, in ReviewCarousel.vue. we want the review data sent from the parents as we do 
    // properties from index.vue -> PropContainer.vue -> PropCard.vue
    async fetchReviews(propId : string){
      if(this.property_reviews[propId]){
        console.log("Returning cached property reviews")
        return 
      }
      console.log("fetching propery reviews from api gateway")
      const prop_reviews = await $fetch<Review[]>(`https://9un9op31m7.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${propId}/reviews`)
      this.property_reviews[propId] = prop_reviews.map((el) => ({
        name: el.name,
        img_src: el.img_src,
        date: el.date,
        platform: el.platform.charAt(0).toUpperCase() + el.platform.slice(1),
        review_content: el.review_content,
        rating: el.rating
      }))
    },
    async fetchImages(propId : string){
      if(this.property_images[propId]){
        console.log("Returning cached property images")
        return 
      }
      console.log("Fetching property images")
      this.property_images_loading[propId] = true
      try {
        const images = await $fetch<{ url: string }[]>(`https://9un9op31m7.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${propId}/images`)
        this.property_images[propId] = images.map(img => img.url)
      } catch (error) {
        console.error("Error fetching property images:", error)
        // set an error state or message here
      }
      finally {
        this.property_images_loading[propId] = false
      }
    }
  }
})