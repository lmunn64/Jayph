<script setup lang="ts">
import { ref, onMounted } from 'vue'

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80',
]
const currentIndex = ref(0)
const prevIndex = ref(0)
const fading = ref(false)

onMounted(() => {
  setInterval(() => {
    fading.value = true
    prevIndex.value = currentIndex.value
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length
      fading.value = false
    }, 1000) // match CSS transition duration
  }, 5000)
})
</script>

<template>
  <div class="hero">
    <div
      class="hero-bg"
      :style="{
        backgroundImage: `url(${images[prevIndex]})`,
      }"
    ></div>
    <div
      class="hero-bg"
      :style="{
        backgroundImage: `url(${images[currentIndex]})`,
        opacity: fading ? 0 : 1
      }"
    ></div>
    <div class="gradient-overlay"></div>
    <div class="hero-overlay">
      <h1 class="hero-title">Approachable. Relaxing. Inspired Spaces. Come Stay Today!</h1>
      <p class="hero-subtitle">Our spaces are designed with you in mind. We wish to provide an atmosphere that makes you smile. </p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 650px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transition: opacity 1s ease-in-out;
  z-index: 0;
  pointer-events: none;
}
.gradient-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.650), transparent);
  z-index: 1;
}
.hero-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  top: 40%;
  transform: translateY(-50%);
}
.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-color-light);
}
.hero-subtitle {
  font-size: 1rem;
  color: var(--text-color-light);
}
</style>