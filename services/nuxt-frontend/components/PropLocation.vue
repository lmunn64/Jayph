<script setup lang="ts">
import GMap from './GMap.vue';


</script>

<template>
    <div class="location-wrapper">
        <div class = "map-wrapper">
            <GMap/>
        </div>
    </div>
</template>

<style scoped>
.map-wrapper{  
    display: flex;
    justify-self: center;
    align-self: center;
    align-self: start;
    width: 90%; 
    height: 80%;
}
.location-wrapper {
    height: 500px;
    background-color: var(--accent-color);
}
</style>
