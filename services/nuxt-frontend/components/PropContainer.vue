<script setup lang="ts">
    import type { Property } from '~/types/property';


    interface Props {
        properties: Property[]
    }

    const props = defineProps<Props>()
    const selectedLocation = ref('Kansas City')

    const filteredProperties = computed(() => {
      return props.properties.filter(p => p.address.city === selectedLocation.value)
    })
</script>

<template>
    <h1>Our Properties</h1>
    <div class="filter-buttons">
      <button
        :class="{ active: selectedLocation === 'Kansas City' }"
        @click="selectedLocation = 'Kansas City'"
      >Kansas City</button>

      <button
        :class="{ active: selectedLocation === 'Branson West' }"
        @click="selectedLocation = 'Branson West'"
      >Branson West</button>
    </div>
    <div class="card-grid">
        <PropCard v-for = "(property, index) in filteredProperties" :title="property.name" :img_src = "property.picture_url" :description = "property.description" :city = "property.address.city" :state = "property.address.state" :guests = "property.capacity.max" :bedrooms = "property.capacity.bedrooms" :bathrooms = "property.capacity.bathrooms"/>
    </div>
</template>

<style scoped>
h1, h2, h3 {
    text-align: center;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 650px));
  justify-content: center;
  gap: 2rem;
  padding: 0 20px;
  box-sizing: border-box;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 1rem;
}
.card-grid > * {
   box-sizing: border-box;
}

/* One card per row if zoomed enough */
@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .card-grid > * {
    width: 100%;
  }
}
.filter-buttons {
  display: flex;
  justify-content: space-between;
  padding-inline: 40vw;
  margin-bottom: 1.5rem;
}

.filter-buttons button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color, #ccc);
  background-color: white;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.filter-buttons button.active {
  background-color: var(--accent-color, #007BFF);
  color: white;
  border-color: var(--accent-color, #007BFF);
}
</style>