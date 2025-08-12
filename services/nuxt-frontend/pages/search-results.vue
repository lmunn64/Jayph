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
        try {
            const response = await $fetch<SearchedProperty[]>('https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/search?' + query)
            if(response){
                searchedProperties.value = response
                console.log('Fetched properties:', searchedProperties.value)
            }
        } catch (error) {
            console.log(error)
            console.log('Could not fetch properties')
            
        } finally {
            loading.value = false
        }
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
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    height: 90vh;
    padding: 20px 60px;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
 }
 @media (max-width: 850px) {
    .wrapper {
        flex-direction: column;
        padding: 10px 30px; 
        height: auto;
    }
 }
  @media (max-width: 500px) {
    .wrapper {
        padding: 0px 20px;  
        height: auto;
    }
 }
</style>