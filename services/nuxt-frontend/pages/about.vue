<script setup lang="ts">

</script>

<template>
  <div class="hero">
   <AboutHero />
  </div>
  <div class="wrapper">
    <AboutContainer />
  </div>
  
</template>

<style scoped>
  .wrapper {
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1000px;        
    padding-inline: 1rem;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
  }
</style>