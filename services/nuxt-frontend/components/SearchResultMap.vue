<script setup lang="ts">
import type { Coordinates, Property_wTotal } from '~/types/property'
import GMap from './GMap.vue'

interface Props {
  enrichedProperties: Property_wTotal[]
}

const searchMapProps = defineProps<Props>()

const zoom = ref<number>(0)

const coordinates = computed<Coordinates[]>(() => {
    console.log("Coordinates updated")
    return searchMapProps.enrichedProperties.map(d => {
        return d.property.coordinates
    })
})

const get_midpoint = (coords: Coordinates[]) => {
    const num_coords = coords.length

    var sum_lat = 0
    var sum_long = 0
    for(var i = 0; i < num_coords; i++){
        sum_lat += parseFloat(coords.at(i)?.latitude!)
        sum_long += parseFloat(coords.at(i)?.longitude!)
    }
    
    const mid_lat = sum_lat / num_coords
    const mid_long = sum_long / num_coords
    return [mid_lat.toString(), mid_long.toString()]
}
/** calculates the midpoint of coordinates type Coordinates[]
 *  uses non caresian conversions because locations so close
 *  
 *  Returns: string[] of coords for passing to map
 */
const get_center_coord = (coords: Coordinates[]) : string[] => {
    if(coords.length === 1)
        return [coords.at(0)?.latitude!, coords.at(0)?.longitude!]
    if(coords.every((c)=> c.city == "Kansas City")){
        zoom.value = 15
        return get_midpoint(coords)
    }
        
    if(coords.every((c)=> c.city == "Branson West")){
        zoom.value = 15
        return get_midpoint(coords)
    }
        

    /** else its either both branson and kansas city or neither, so show whole map */
    zoom.value = 6
    return ['37.8736461', ' -93.8935481']
}

/** center coordinate to send to GMAP */
const center = computed<string[]>(() => {
    const cen = get_center_coord(coordinates.value)
    console.log(cen)
    return cen
})

</script>

<template>
    <div class="container">
        <div v-if="searchMapProps.enrichedProperties.length === 0">
            Loading...
        </div>
        <div v-else class="map">
            <GMap :zoom = "zoom" :latitude = "center[0]" :longitude = "center[1]" :props_coords ="coordinates"/>
        </div>
    </div>
</template>

<style scoped>
    .container {
        /* padding: 1rem 0; */
        width: 40%;
        height: auto;
    }
    .map {
        /* padding: 1rem 0; */
        background-color: var(--accent-color);
        width: 100%; 
        height: 100%;
    }
</style>