<script setup lang ='ts'>
    import { reactive } from 'vue'
    import type { Property, HouseRules, Capacity, Address} from '~/types/property'

    const state = reactive({
        properties: [] as Property[],
        isLoading: true,
    })

    const { data: properties } = await useAsyncData('properties', () =>
        $fetch('http://localhost:5000/properties')
    )

    onMounted(() => {
        if (Array.isArray(properties.value)) {
            properties.value.forEach((el: any) => {
                let cap : Capacity = {
                    max : el.capacity.max,
                    bedrooms : el.capacity.bedrooms,
                    beds : el.capacity.beds,
                    bathrooms : el.capacity.bathrooms,
                }
                let hr : HouseRules = {
                    pets_allowed : el.house_rules.pets_allowed,
                    smoking_allowed : el.house_rules.smoking_allowed,
                    events_allowed : el.house_rules.events_allowed,
                }
                let addr : Address = {
                    city : el.address.city,
                    state : el.address.state,
                    country : el.address.country,
                    postcode : el.address.postcode,
                }
                let prop : Property = {
                    id : el.id,
                    name : el.name,
                    picture_url : el.picture_url,
                    address : addr,
                    amenities : el.amenities,
                    description : el.description,
                    summary : el.summary,
                    capacity : cap,
                    house_rules : hr
                }
                state.properties.push(prop)
            })
            state.isLoading = false
        } else {
            console.error('Unexpected response from server')
        }
    })
</script>

<template>
  <!-- Navigation Bar -->
  <div>

    <NavBar />    
 
    <h1>Welcome to Jayph homepage.</h1>
 
  <!-- Hero component -->

    <!-- TODO -->
    <Hero />
  

  <!-- Reviews components -->

    <h2>Reviews</h2>
    <!-- TODO: FORMAT REVIEWS -->
    <ReviewCard />


   <!-- Properties components-->

    <PropContainer :properties= "state.properties"/>

  </div>
</template>

<style scoped>

h1, h2, p {
  text-align: center;
}


</style>