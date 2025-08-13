<!-- 
    MapInfoPropCard component
    contains:
        property card to be used for the clickable map 
-->

<script setup lang="ts">
import type { Property_wTotal } from '~/types/property'

const props = defineProps<{
  property: Property_wTotal
}>()
</script>

<template>
  <div class="card">
    <img class="thumbnail" :src="property.property.picture_url" alt="property image" />
    <div class="details">
        <div class="property-info">
            <h2>{{ property.property.name }}</h2> 
        </div>    
    </div>
  </div>
</template>

<style scoped>
h2 {
    font-size: 1.2em;
}
.card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 300px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 16px;
    border: 2px solid #e2e2e2;
    cursor: pointer;
    transition: ease 0.2s;
}
.thumbnail {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    display: block;
    transition: transform 0.2s ease;
}
.details{
    display: flex;
    flex-direction: column;
    flex: 1; 
    min-height: 0;
}
.property-info {
    padding: 0 1.5rem;
}
@media (max-width: 400px){
.thumbnail {
    height: 180px;
}
}
</style>