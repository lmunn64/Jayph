<script setup lang="ts">
import type { PropType } from 'vue'
import type { Property_wTotal } from '~/types/property';


const props = defineProps<{
  enrichedProperties: Property_wTotal[]
}>()


</script>

<template>
  <div class="property-list">
    <div v-if="props.enrichedProperties.length === 0">
      Loading...
    </div>
    <div v-else class="grid-container">
      <SearchPropCard
        v-for="property in props.enrichedProperties"
        :key="property.property.id"
        :property="property"
      />
    </div>
  </div>
</template>

<style scoped>
.property-list {
    width: 50%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(320px,1fr));
  gap: 1.5rem; 
  padding: 1rem 0;
}
</style>