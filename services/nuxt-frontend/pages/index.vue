<script setup lang ='ts'>
    import { usePropertyStore } from '~/stores/properties'

    const propertyStore = usePropertyStore()

    await propertyStore.fetchProperties()
    
</script>

<template>
  <!-- Hero component -->
  <div class="hero-section">
    <HeroContainer />
    <ListingSearch />
  </div>
  <div class="wrapper">  

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