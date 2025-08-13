<!-- 
    SearchResultProps component
    contains:
        grid-style listing of properties based on search results
        separates by available and unavailable properties
        handles loading with simple text placeholder
        set height, any overflowing properties will be visible with scrollbar
        expands to full width on screen-width < 850px
-->

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Property_wTotal } from '~/types/property';
import SkeletonSearchCard from '../skeleton-components/SkeletonSearchCard.vue';

const props = defineProps<{
  enrichedProperties: Property_wTotal[]
  missingProperties: Property_wTotal[]
  loading: boolean
}>()


</script>

<template>
  <div class="property-list">
    <h1> {{ enrichedProperties.length }} of {{ enrichedProperties.length + missingProperties.length }} properties available</h1>
    <div v-if="props.loading">
        <div class="grid-container">
        <SkeletonSearchCard v-for="n in 4" :key="n" />
      </div>
    </div>
    <div v-else>
      <div v-if="props.enrichedProperties.length === 0">
        No properties found.
      </div>
      <div v-else class="grid-container">
        <SearchCompsSearchPropCard
          v-for="property in props.enrichedProperties"
          :key="property.property.id"
          :property="property"
        />
      </div>
      <h1 v-if="missingProperties.length === 1"> 1 unavailable property</h1>
      <h1 v-else> {{ missingProperties.length }} unavailable properties</h1>
      <div class="grid-container-unavailable">
        <SearchCompsSearchPropCard
          v-for="property in props.missingProperties"
          :key="property.property.id"
          :property="property"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-list {
  width: 50%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 1rem;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(320px,1fr));
  gap: 1.5rem; 
}

.grid-container-unavailable {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(320px,1fr));
  gap: 1.5rem; 
  opacity: 50%;
}
@media (max-width: 850px) {
  .property-list {
    width: 100%;
    
    padding-right: 0;
    scrollbar-width: none;
  }
}
</style>