<script setup lang ='ts'>
    import { ref, reactive} from 'vue'
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
  <div class="nav">
    <NavBar />    
  </div>

  <div>
    <h1>Welcome to Jayph homepage.</h1>
  </div>
  <!-- Hero component -->
  <div>
    <!-- TODO -->
    <Hero />
  </div>

  <!-- Reviews components -->
   <div>
    <h2>Reviews</h2>
    <!-- TODO: FORMAT REVIEWS -->
    <ReviewCard />
   </div>

   <!-- Properties components-->
    <div>
      <h2>Our Properties</h2>
      <!-- TODO: FORMAT CARDS -->
       <div v-for = "(property, index) in state.properties" class="card-grid">
            <PropCard :title="property.name" :img_src = "property.picture_url" :description = "property.description" :guests = "property.capacity.max" :bedrooms = "property.capacity.bedrooms" :bathrooms = "property.capacity.bathrooms"/>
       </div>
    </div>
</template>

<style scoped>

h1, h2, p {
  text-align: center;
}
.nav {
  padding-top: 80px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
  max-width: calc(650px * 2 + 2rem + 2rem + 2rem);
  margin: 0 auto;
}
.card-grid > * {
  width: min(650px, 100%);
  min-width: 300px; /* don't shrink below 300px */ 
  max-width: 100%;
  box-sizing: border-box;
}

/* One card per row if zoomed enough */
@media (max-width: 700px) {
  .card-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .card-grid > * {
    width: 100%;
  }
}
</style>