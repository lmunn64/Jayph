<script setup lang="ts">
    import { ref } from 'vue'
    import { GoogleMap, Circle, Marker, MarkerCluster, AdvancedMarker } from 'vue3-google-map'
    import type { Coordinates } from '~/types/property';

    const config = useRuntimeConfig()
    interface Props {
        props_coords?: Coordinates[]
        zoom: number
        // Used for center (when props_coords it will be either a kansas city coord, branson city coord or both zoomed out for view of all locations)
        latitude: string
        longitude: string
    }

    const mapProps = defineProps<Props>()
    console.log(mapProps.props_coords)
    const center = computed(() => ({
        lat: parseFloat(mapProps.latitude), 
        lng: parseFloat(mapProps.longitude)
    }))

    
    const locations = computed(() => {
        if (!mapProps.props_coords) return []
        
        return mapProps.props_coords.map((e: Coordinates) => ({
            lat: parseFloat(e.latitude),
            lng: parseFloat(e.longitude)
        }))
    })

    /** If there are several property coordinates, it will map them to locations which will 
     *  be used for a Marker Cluster */
    console.log(locations.value)

    const circle = computed(() => ({
        center: center.value,
        radius: 400,
        strokeColor: '#FF1004',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35, 
    }))
</script>


<template>
    <GoogleMap class = "prop-map"
        :api-key="config.public.googleMapsApiKey"
        :center = "center"
        :map-id = "config.public.googleMapsId"
        :zoom = "zoom"
    >
    <MarkerCluster v-if= "mapProps.props_coords !== undefined">
      <AdvancedMarker
        v-for="(location, i) in locations"
        :key="i"
        :options="{ position: location }"
      />
    </MarkerCluster>

    <Circle v-if = "mapProps.props_coords === undefined" :options="circle" />
</GoogleMap>

</template>

<style scoped>

.prop-map{
    overflow: hidden;
    border-radius: inherit;
    width: 100%; 
    height: 100%
}
</style>