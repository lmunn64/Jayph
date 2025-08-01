<script setup lang="ts">
    import { ref } from 'vue'
    import {GoogleMap} from 'vue3-google-map'
    const center = {lat: 41.4318592, lng: -87.9886336}
    const zoom = 13
</script>


<template>

    <GoogleMap class = "prop-map"
    api-key="AIzaSyB_hQCpHH6Rj9V7grVWslNTMBHY3LxdvnU"
    :center = "center"
    :zoom = "zoom"
    />



</template>

<style>

.prop-map{
    width: 100%; 
    height: 100%
}
</style>