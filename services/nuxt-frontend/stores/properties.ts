import { defineStore } from 'pinia'
import type { Property } from '~/types/property'

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [] as Property[],
    isLoaded: false,
  }),
  actions: {
    async fetchProperties() {
      if (this.isLoaded) return
      const properties = await $fetch<Property[]>('https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/api_properties')
      this.properties = properties.map((el) => ({
        id: el.id,
        name: el.name,
        picture_url: el.picture_url,
        address: {
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
    }
  }
})