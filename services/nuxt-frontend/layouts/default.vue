<script setup lang="ts">
import Navbar from '~/components/NavBar.vue'
</script>

<template>
  <div class="layout">
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  background-color: var(--bg-color);
  color: var(--text-color-dark);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>