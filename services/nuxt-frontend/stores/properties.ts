import { defineStore } from 'pinia'
import type { Calendar } from '~/types/calendar'
import type { Property, Review } from '~/types/property'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [] as Property[],
    isLoaded: false,
    isLoading: false,
    property_reviews: {} as Record<string, Review[]>,

    property_images: {} as Record<string, string[]>,
    property_images_loading: {} as Record<string, boolean>,
    
  }),
  actions: {
    ingest(raw : Property[]){
      if (this.isLoaded) return this.properties
        this.properties = raw.map((el) => ({
        id: el.id,
        name: el.name,
        picture_url: el.picture_url,
        coordinates: {
          city: el.coordinates.city,
          state: el.coordinates.state,
          latitude: el.coordinates.latitude,
          longitude: el.coordinates.longitude,
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
      return this.properties
    },
    async fetchProperties() {
      if(this.isLoaded) return this.properties
      if(this.isLoading){
        await new Promise(r => setTimeout(r, 30))
        return this.properties
      }
      this.isLoading = true
      try {
        const raw = await $fetch<Property[]>('/api/properties')
        return this.ingest(raw)
      } catch (error) {
        console.error("Error fetching properties:", error)
        this.isLoaded = false
        return []
        // set an error state or message here
      }
      finally {
        this.isLoading = false
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
        return this.property_reviews[propId]
      }
      try{     
        console.log("fetching propery reviews from api gateway")
        const prop_reviews = await $fetch<Review[]>(`/api/properties/reviews/${propId}`)
        this.property_reviews[propId] = prop_reviews.map((el) => ({
          name: el.name,
          img_src: el.img_src,
          date: el.date,
          platform: el.platform.charAt(0).toUpperCase() + el.platform.slice(1),
          review_content: el.review_content,
          rating: el.rating
        }))
        return this.property_reviews[propId]
      } catch (error) {
        this.property_reviews[propId] = []
        return []
      }
    },
    async fetchImages(propId : string){
      if(this.property_images[propId]){
        console.log("Returning cached property images")
        return 
      }
      console.log("Fetching property images")
      this.property_images_loading[propId] = true
      try {
        const images = await $fetch<{ url: string }[]>(`/api/properties/images/${propId}`)
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