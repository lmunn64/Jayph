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
            <p>{{ property.property.capacity.bedrooms }} bedrooms • {{ property.property.capacity.bathrooms }} bathrooms • sleeps {{ property.property.capacity.max }}</p>
        </div>
        <div class="price">
            <h3>{{ property.total_before_taxes }}</h3>
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
  color: inherit;
  display: block;
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
.details {
    padding: 0 1.5rem;
}
.price {
    text-align: right;
}
</style>