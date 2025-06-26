<script setup lang="ts">
    import type { Property } from '~/types/property';


    interface Props {
        properties: Property[]
    }

    const props = defineProps<Props>()
</script>

<template>
    <h2>Our Properties</h2>
    <div class="card-grid">
        <PropCard v-for = "(property, index) in props.properties" :title="property.name" :img_src = "property.picture_url" :description = "property.description" :guests = "property.capacity.max" :bedrooms = "property.capacity.bedrooms" :bathrooms = "property.capacity.bathrooms"/>
    </div>
</template>

<style scoped>
h2, h3 {
    text-align: center;
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