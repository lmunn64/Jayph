<script setup lang="ts">
import SkeletonPropHero from '~/components/skeleton-components/SkeletonPropHero.vue'
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

const targetSection = ref<HTMLElement | null>(null)

function scrollToSection() {
  targetSection.value?.scrollIntoView({ behavior: 'smooth' })
}

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
        <PropHero @scroll-to-section="scrollToSection"
            v-if="images" 
            :images="images" 
            :summary="property.summary"
        />
        <div v-else-if="imagesLoading">
            <SkeletonPropHero/>
        </div>

        <div class="wrapper">
            <h1>{{ property.name }}</h1>
            <p class = "summary">{{ property.summary }}</p>

            <!-- Rest of your content loads immediately -->
            
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

            <h1 ref="targetSection" style="text-align: center">Booking</h1>
            <PropBooking :id="id" :max_capacity = "property.capacity.max"/>
            
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

h1, h2{
    padding-inline: var(--primary-header-inline);
}

h3 {
    padding-inline: var(--secondary-header-inline);
}

p {
    padding-inline: var(--secondary-header-inline);
    tab-size: 0;
}
.summary{
    font-size: var(--paragraph-secondary-text-size)
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