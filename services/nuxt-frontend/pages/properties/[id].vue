<script setup lang="ts">
import { usePropertyStore } from '~/stores/properties'
import type { Calendar } from '~/types/calendar'

const route = useRoute()
const id = route.params.id as string
const propertyStore = usePropertyStore()

// Load properties first (blocking)
const {data: properties} = await useAsyncData('properties', async () => {
    await propertyStore.fetchProperties()
    return propertyStore.properties
})

const property = computed(() => {
    if (properties.value) {
        return properties.value.find(p => p.id.toString() === id)
    }
    return undefined
})

// Load images asynchronously WITHOUT await (non-blocking)
const images = ref<string[]>()
const imagesLoading = ref(true)
onMounted(async () => {
    try {
        await propertyStore.fetchImages(id)
        images.value = propertyStore.property_images[id]
    } catch (error) {
        console.error('Error loading images:', error)
    } finally {
        imagesLoading.value = false
    }
})
</script>

<template>
    <div v-if="property">
        <!-- Show hero immediately with loading state -->
        <PropHero 
            v-if="images" 
            :images="images" 
        />
        <div v-else-if="imagesLoading" class="hero-loading">
            <p>Loading images...</p>
        </div>

        <div class="wrapper">
            <h1>{{ property.name }}</h1>
            <p>{{ property.summary }}</p>

            <!-- Rest of your content loads immediately -->
            <h2>Amenities</h2>
            <Amenities :amenities="property.amenities"/>

            <h2>Space Overview</h2>
            <p>{{ property.details.space_overview }}</p>

            <div v-if="property.details.neighborhood_description"> 
                <h3>About the Neighborhood</h3>
                <p>{{ property.details.neighborhood_description }}</p>
            </div>

            <h3>Guest Access</h3>
            <p>{{ property.details.guest_access }}</p>

            <h3>Other Details</h3>
            <p>{{ property.details.other_details }}</p>

            <PropBooking :id="id" />

            <h1 style="text-align: center;">Reviews</h1>
            <ReviewCarousel :propertyId="id" />

            <PropLocation v-if = "property.coordinates.latitude && property.coordinates.longitude" :getting_around ="property.details.getting_around" :latitude="property.coordinates.latitude" :longitude ="property.coordinates.longitude"/>
        </div>
    </div>
    <div v-else>
        <p>Loading property...</p>
    </div>
</template>

<style scoped>
.hero-loading {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
}

h1, h2, h3 {
    padding-inline: 2rem;
}

p {
    padding-inline: 3rem;
    white-space: pre-wrap;
    tab-size: 0;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1200px;        
    padding-inline: 1rem;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
}
</style>