<script setup lang="ts">
import type { PropType } from 'vue'
import type { Property } from '~/types/property';

interface SearchedProperty {
  uuid: string
  total_before_taxes: number
}

const props = defineProps<{
  searchedProperties: SearchedProperty[]
  allProperties: Property[]
}>()

const enrichedProperties = computed(() => {
  return props.searchedProperties.map(sp => {
    const fullProperty = props.allProperties.find(p => p.id === sp.uuid)
    return {
      ...fullProperty,
      total_before_taxes: sp.total_before_taxes,
    }
  }).filter(p => p !== undefined) as (Property & { total_before_taxes: number })[]
})
</script>

<template>
  <div class="property-list">
    <div v-if="enrichedProperties.length === 0">
      Loading...
    </div>
    <div v-else class="grid-container">
      <SearchPropCard
        v-for="property in enrichedProperties"
        :key="property.id"
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