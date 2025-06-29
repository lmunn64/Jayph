<script setup lang="ts">
    const images = [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80', // mountain lake
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80', // beach
        'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80', // night mountain
    ]
    const currentIndex = ref(0)
    onMounted(() => {
        setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % images.length
        }, 5000) // Change image every 5 seconds
    })
</script>

<template>
    <div class="hero">
    <div class="slideshow">
      <img
        v-for="(img, index) in images"
        :key="img"
        :src="img"
        class="hero-image"
        :class="{ active: index === currentIndex }"
        alt="Hero Slide"
      />
    </div>

    <div class="hero-overlay">
      <h1 class="hero-title">Welcome to Fountain City Stays!</h1>
      <p class="hero-subtitle">Our spaces are designed with you in mind. We wish to provide an atmosphere that makes you smile. </p>
    </div>
  </div>
</template>

<style scoped>
    p {
        text-align:center;
    }
    .hero {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
    }

    .slideshow {
    position: absolute;
    width: 100%;
    height: 100%;
    }

    .hero-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    }

    .hero-image.active {
    opacity: 1;
    z-index: 1;
    }

    .hero-overlay {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    top: 50%;
    transform: translateY(-50%);
    }

    .hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--text-color-light);
    }
    .hero-subtitle {
    font-size: 1.5rem;
    color: var(--text-color-light);
    }
</style>