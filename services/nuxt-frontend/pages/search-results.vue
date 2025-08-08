<script setup lang="ts">

    import { SearchCodeIcon } from 'lucide-vue-next'
    import { usePropertyStore } from '~/stores/properties'
    import type { SearchedProperty, Property, Property_wTotal } from '~/types/property'
    const propertyStore = usePropertyStore()

    await propertyStore.fetchProperties()

    const route = useRoute()

    const searchedProperties = ref<SearchedProperty[]>([])

    const loading = ref(true)

    async function fetchSearchedProperties() {
        loading.value = true
        const query = route.fullPath.split('?')[1] || ''
        console.log(query)
        searchedProperties.value = await $fetch<SearchedProperty[]>('https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/search?' + query)
        console.log('Fetched properties:', searchedProperties.value)
        loading.value = false
    }

    // properties obtained from search including all property info
    const enrichedProperties = computed<Property_wTotal[]>(() => {
        return searchedProperties.value.map(sp => {
            const fullProperty = propertyStore.properties.find(p => p.id === sp.uuid)
            return fullProperty ? {
                property: fullProperty,
                total_before_taxes: String(sp.total_before_taxes),
            } : undefined
        }).filter(p => p !== undefined)
    })

    // all other properties not available in search
    const missingProperties = computed<Property_wTotal[]>(() => {
        return propertyStore.properties
        .filter(p => !searchedProperties.value.map(sp => sp.uuid).includes(p.id))
        .map(p => ({
            property: p,
            total_before_taxes: '',
        }))
    })


    watch(() => route.query, () => {
        fetchSearchedProperties()
    })

    onMounted(() => {
        fetchSearchedProperties()
    })
</script>

<template>
    <!-- todo: pass previous search object to automatically 
        populate ListingSearch (if applicable) -->
    <ListingSearch />
    <div class="wrapper">
        <!-- display property listings and map of all results side-by-side -->
        <SearchResultProps :enrichedProperties="enrichedProperties ?? []" :missingProperties = "missingProperties ?? []" :loading="loading"/>
        <SearchResultMap :enrichedProperties="enrichedProperties" :missingProperties = "missingProperties ?? []" :loading="loading"/>
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
    height: 85vh;
    padding: 1rem 1rem;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
 }
 @media (max-width: 850px) {
    .wrapper {
        flex-direction: column;
        height: auto;
    }
 }
</style>