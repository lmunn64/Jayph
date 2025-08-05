<script setup lang="ts">

    import { usePropertyStore } from '~/stores/properties'
    import type { SearchedProperty, Property, Property_wTotal } from '~/types/property'
    const propertyStore = usePropertyStore()

    await propertyStore.fetchProperties()

    const route = useRoute()

    const searchedProperties = ref<SearchedProperty[]>([])

    async function fetchSearchedProperties() {
        const query = route.fullPath.split('?')[1] || ''
        console.log(query)
        searchedProperties.value = await $fetch<SearchedProperty[]>('https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/search?' + query)
        console.log('Fetched properties:', searchedProperties.value)
    }

    const enrichedProperties = computed<Property_wTotal[]>(() => {
        return searchedProperties.value.map(sp => {
            const fullProperty = propertyStore.properties.find(p => p.id === sp.uuid)
            return fullProperty ? {
                property: fullProperty,
                total_before_taxes: String(sp.total_before_taxes),
            } : undefined
        }).filter(p => p !== undefined)
    })

    watch(() => route.query, () => {
        fetchSearchedProperties()
    })

    onMounted(() => {
        fetchSearchedProperties()
    })
</script>

<template>
    <ListingSearch />
    <h1 v-if="searchedProperties.length > 0" class="title">Results ({{ searchedProperties.length }})</h1>
    <div class="wrapper">
        <!-- display property listings and map of all results side-by-side -->
        <SearchResultProps :enrichedProperties="enrichedProperties ?? []"/>
        <SearchResultMap :enrichedProperties="enrichedProperties"/>
    </div>
</template>

<style scoped>
.title {
    padding-inline: 6rem;
}
.wrapper {
  display: flex;
    flex-direction: wrap;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    padding-inline: 1rem;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
 }
</style>