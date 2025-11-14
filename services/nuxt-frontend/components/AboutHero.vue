<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref, onMounted, onUnmounted } from 'vue'
  import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/autoplay'
  import 'swiper/css/navigation';
  import 'swiper/css/effect-coverflow'

  const modules = [Autoplay ,EffectCoverflow]

  const found = Object.values(import.meta.glob('/content/about-images/*.{jpg,jpeg,png,webp,JPG}', { eager: true, query: '?url', import: 'default' })) as string[]
  const slideshowImages = found
</script>

<template>
<div class="hero">
      <!-- slideshow element -->

      <div class="swiper">
        <Swiper
          :modules="modules"
          :slides-per-view="'auto'"
          :space-between="0"
          :centered-slides="true"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: false,
          }"
          :loop="true" 
          :effect="'coverflow'"
          :grab-cursor="true"
          :auto-height="true"
          :coverflow-effect="{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          }" 
          :breakpoints="{
            700: {
              slidesPerView: 'auto',
            },
            1285: {
              slidesPerView: 'auto'
            }
          }"
        >
          <SwiperSlide v-for="(img, i) in slideshowImages" :key="i">
            <img draggable="false" :src="img" alt="image">
          </SwiperSlide>
        </Swiper>
      </div>
</div>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.swiper {
  position: relative;
  height: 375px;
}
.swiper-slide {
  height: 375px;
  width: auto;
}

.swiper-slide img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

:deep(.swiper-slide) {
  opacity: 0.6; /* dim non-active slides */
  transition: opacity 0.5s ease; /* smooth fade effect */
}

:deep(.swiper-slide-active) {
  opacity: 1;
}

@media (max-width: 650px){
  .swiper {
    height: 250px;
  }
  .swiper-slide {
    height: 250px;
  }
  
}
</style>