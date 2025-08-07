<script setup lang="ts">
import type { Property } from '~/types/property';
import GMap from './GMap.vue';

interface Props {
    getting_around : string | undefined
    latitude : string
    longitude : string
}

const locationProps = defineProps<Props>()
</script>

<template>
    <div class="location-wrapper">
        <h2>Find us</h2>
        <p v-if = "locationProps.getting_around">{{ locationProps.getting_around }}</p>
        <div class = "map-wrapper">
            <GMap :zoom = 13 :latitude = "locationProps.latitude" :longitude = "locationProps.longitude"/>
        </div>
    </div>
</template>

<style scoped>
.map-wrapper{  
    width: 100%; 
    height: 100%;
}
.location-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: start;
    height: 65vh;
    padding: 25px;
    background-color: var(--accent-color);
}
h2{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: x-large;
    align-self: start;
}
p{
    margin-bottom: 20px;
    white-space: pre-wrap;
}
</style>
