<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const found = Object.values(import.meta.glob('/content/hero-images/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })) as string[]
  const images = found

  const currentIndex = ref(0)
  const prevIndex = ref(0)
  const fading = ref(false)

  let slideTimer : ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    slideTimer = setInterval(() => {
      fading.value = true
      prevIndex.value = currentIndex.value
      setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length
        fading.value = false
      }, 1000) // match CSS transition duration
    }, 5000)
  })

  // setInterval cleanup
  onUnmounted(()=>{{
    if(slideTimer) {
      clearInterval(slideTimer)
      slideTimer = null
    }
  }})
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
      <h1 class="hero-main-title" >Fountain City Stays</h1>

      <h1 class="hero-title">Approachable. Relaxing. Inspired Spaces</h1>
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
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center bottom; /* <-- This aligns the image bottom with the container bottom */

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
  top: 35%;
  transform: translateY(-50%);
}
.hero-main-title {
  font-size:var(--main-title-text-size);
  margin-bottom: 0rem;
  color: var(--text-color-light);
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: var(--text-color-light);
}
.hero-subtitle {
  font-size: var(--paragraph-secondary-text-size);
  color: var(--text-color-light);
}
@media (max-width: 550px){
  .hero-main-title {
    font-size:var(--main-title-mobile-text-size);
  }

  .hero-bg {
    background-position: center;
    background-size: cover;
    background-attachment: scroll;
  }
  .hero-title {
    font-size:var(--header-mobile-text-size);
  }
  .hero-subtitle {
    font-size: var(--paragraph-mobile-text-size)
  }
}
</style>