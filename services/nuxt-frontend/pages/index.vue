<script setup lang ='ts'>
    import { reactive } from 'vue'
    import type { Property, HouseRules, Capacity, Address} from '~/types/property'
    import { usePropertyStore } from '~/stores/properties'

    const propertyStore = usePropertyStore()

    await propertyStore.fetchProperties()
    
</script>

<template>
  <div class="wrapper">  
    <!-- Hero component -->
    <HeroContainer />

    <!-- Listing Search -->
    <ListingSearch />
    
    <!-- Properties components-->
    <div v-if="propertyStore.isLoaded">
        <PropContainer :properties= "propertyStore.properties"/>
    </div>
    
    <!-- Reviews components -->
    <h1> Why Guests Choose Us...</h1>
    <ReviewCarousel />

  </div>
</template>

<style scoped>

h1, h2, p {
  text-align: center;
}
.wrapper {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0; 
}

</style>