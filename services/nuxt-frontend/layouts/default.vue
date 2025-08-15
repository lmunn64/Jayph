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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color-dark);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: calc(var(--vh, 1vh) * 100); /* uses JS-set --vh when available */

}

.layout > .footer {
  margin-top: auto;
  margin-bottom: -20px;
}
</style>