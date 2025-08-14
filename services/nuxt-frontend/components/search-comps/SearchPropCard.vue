<!-- 
    SearchPropCard component
    contains:
        property card to be used for Property_wTotal interface
        simplified version of PropCard which includes price total
-->

<script setup lang="ts">
import type { Property_wTotal } from '~/types/property'

const props = defineProps<{
  property: Property_wTotal
}>()
</script>

<template>
<NuxtLink :to="`/properties/${property.property.id}`" class="card-link" draggable="false">
  <div class="card">
    <img class="thumbnail" :src="property.property.picture_url" alt="property image" />
    <div class="details">
        <div class="property-info">
            <h2>{{ property.property.name }}</h2> 
            <div>{{ property.property.coordinates.city }}</div> 
            <p>{{ property.property.capacity.bedrooms }} bedrooms • {{ property.property.capacity.bathrooms }} bathrooms • sleeps {{ property.property.capacity.max }}</p>
        </div>
        <div class = "result-container">
            <div v-if="property.total_before_taxes.length!==0" class="price-container">
                <div class = "price">{{ property.total_before_taxes }}</div>
                <div class = "price-helper"> Total before taxes</div>
            </div>
            <div v-else class="price-container">
                <div class = "price-helper"> Available on other dates</div>
            </div>
        </div>
        
    </div>
  </div>
</NuxtLink>
</template>

<style scoped>
h2 {
    font-size: 1.2em;
}
.card-link {
  text-decoration: none;
  width: 100%;

  color: inherit;
  display: flex;
}
.card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 16px;
    border: 2px solid #e2e2e2;
    cursor: pointer;
    transition: ease 0.2s;
}
.thumbnail {
    width: 100%;
    height: 250px;
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
.result-container{
    display: flex;
    bottom:0;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
    background-color: #f7f7f7;
    min-height: 70px;
    margin-top: auto;
}
.price {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    color: var(--secondary-color);
    font-weight: bold;
    text-align: right;
}

.price-helper {
    display: flex;
    flex-direction: column;
    text-align: right;
}
@media (max-width: 400px){
.thumbnail {
    height: 180px;
}
}
</style>