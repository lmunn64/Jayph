<!-- dynamic page for all properties -->

<script setup lang="ts">
    import { usePropertyStore } from '~/stores/properties'
    const route = useRoute()
    const id = route.params.id as string

    const propertyStore = usePropertyStore()
    await propertyStore.fetchProperties()

    const property = computed(() =>
        propertyStore.properties.find(p => p.id.toString() === id)
    )

    const { data: imageData, error } = await useAsyncData(`images-${id}`, () =>
        $fetch<{ url: string }[]>(`https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/api_properties/${id}/images`)
    )

    const state = reactive({
        images: [] as string[],
        isLoading: true,
    })

    onMounted(() => {
        if (Array.isArray(imageData.value)) {
            state.images = imageData.value.map((img) => img.url)
        } else {
            console.error('No image data returned')
        }
        state.isLoading = false
    })
</script>

<template>
    <div v-if="property">
        <!-- hero - slideshow with gallery option -->
        <PropHero v-if="!state.isLoading && state.images.length" :images="state.images" />

        <div class="wrapper">
            <h1> {{ property.name }} </h1>
            <p> {{ property.summary }}</p>

            <!-- amenities -->
            <h2> Amenities </h2>
            <Amenities :amenities="property.amenities"/>

            <!-- about property  -->
            <h2> Space Overview </h2>
                <p> {{ property.details.space_overview }}</p>
                <!-- neighborhood details sometimes not populated, don't show in that case -->
            <div v-if="property.details.neighborhood_description"> 
                <h3> About the Neighborhood</h3>
                    <p> {{ property.details.neighborhood_description }}</p>
            </div>
            <h3> Guest Access </h3>
                <p> {{ property.details.guest_access }}</p>
            <h3> Other Details </h3>
                <p> {{ property.details.other_details }}</p>
            <!-- booking -->
            <PropBooking :id = 'id' />
            <!-- review carousel -->
            <h1 style="text-align: center;">Reviews</h1>
            <ReviewCarousel :propertyId="id" />

            <!-- location -->
            <PropLocation />
            </div>

        


    </div>
    <div v-else>
            <p> Loading property... </p>
    </div>
</template>

<style scoped>
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