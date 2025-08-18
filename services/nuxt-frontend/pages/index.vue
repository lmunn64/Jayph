<script setup lang ='ts'>
import ReviewCarousel from '~/components/review-comps/ReviewCarousel.vue';
import { usePropertyStore } from '~/stores/properties'

    const propertyStore = usePropertyStore()

    await useAsyncData('properties', () => propertyStore.fetchProperties())

</script>

<template>
  <!-- Hero component -->
  <div class="hero-section">
    <HeroContainer />
    <SearchCompsListingSearch/>
  </div>
  <div class="wrapper">  

    <!-- Properties components-->
    <div v-if="propertyStore.isLoaded">
        <PropCompsPropContainer :properties= "propertyStore.properties"/>
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
/* .wrapper {
    padding-inline: 1rem;
    max-width: 1200px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0; 
} */
.hero-section {
  position: relative;
  width: 100%;
  height: fit-content; /* Full viewport height */
}
.wrapper {
  z-index: var(--primary-z-index);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1400px;        
  padding-inline: 1rem;    
  margin: 0 auto;
  box-sizing: border-box; 
  background-color: var(--bg-color);
}

</style>