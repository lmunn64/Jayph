<script setup lang="ts">

    import { usePropertyStore } from '~/stores/properties'

    const propertyStore = usePropertyStore()

    await propertyStore.fetchProperties()

    interface SearchProperty {
        uuid: string
        total_before_taxes: number
    }

    const route = useRoute()

    const searchedProperties = ref<SearchProperty[]>([])

    async function fetchSearchedProperties() {
        const query = route.fullPath.split('?')[1] || ''

        searchedProperties.value = await $fetch<SearchProperty[]>('http://127.0.0.1:8000/api_properties/search?' + query)
        console.log('Fetched properties:', searchedProperties.value)
    }

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
        <SearchResultProps :searchedProperties="searchedProperties" :allProperties="propertyStore.properties"/>
        <SearchResultMap />
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