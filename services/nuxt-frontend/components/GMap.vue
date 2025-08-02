<script setup lang="ts">
    import { ref } from 'vue'
    import { GoogleMap, Circle, Marker, MarkerCluster } from 'vue3-google-map'
import type { Coordinates } from '~/types/property';
    const config = useRuntimeConfig()
    interface Props {
        props_coords?: Coordinates[]

        // Used for center (when props_coords it will be either a kansas city coord, branson city coord or both zoomed out for view of all locations)
        latitude: string
        longitude: string
    }

    const mapProps = defineProps<Props>()
    
    const center = {lat: parseFloat(mapProps.latitude), lng: parseFloat(mapProps.longitude)}
    
    const locations: Array<{ lat: number; lng: number }> = []

    /** If there are several property coordinates, it will map them to locations which will 
     *  be used for a Marker Cluster */
    if(mapProps.props_coords){
        mapProps.props_coords.forEach((e : Coordinates) => {
            var loc_coords = {
                lat: parseFloat(e.latitude), lng: parseFloat(e.longitude)
            }
            locations.push(loc_coords)
        })
        
    }
    const circle = {
        center: center,
        radius: 500,
        strokeColor: '#FF1004',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35, 
    }
    const zoom = 13

</script>


<template>
    <GoogleMap class = "prop-map"
        :api-key= "config.public.googleMapsApiKey"
        :center = "center"
        :zoom = "zoom"
    >
    <MarkerCluster v-if= "mapProps.props_coords !== undefined">
      <Marker
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
    width: 100%; 
    height: 100%
}
</style>