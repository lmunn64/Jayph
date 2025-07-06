<!-- 
    Hero component for property pages
    Contains:
        - slideshow with text heading
        - 'see all photos' button
          - when clicked, displays photos in grid style
          - selecting a photo from this grid will allow for manual
            scrolling with image previews at the bottom
-->

<script setup lang="ts">
    const images = [
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80',
]
    const currentIndex = ref(0)
    const showGallery = ref(false)
    const showSlideshow = ref(false)
    const slideshowIndex = ref(0)
    onMounted(() => {
        setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % images.length
        }, 5000) // Change image every 5 seconds, loop to start
    })

    function openGallery(){
      showGallery.value = true
    }

    function openSlideshow(index: number) {
      slideshowIndex.value = index
      showSlideshow.value = true
    }

    function closeAllModals() {
      showGallery.value = false
      showSlideshow.value = false
    }

    function nextSlide() {
      slideshowIndex.value = (slideshowIndex.value + 1) % images.length
    }

    function prevSlide() {
      slideshowIndex.value = (slideshowIndex.value - 1 + images.length) % images.length
    }
</script>

<template>
    <div class="hero">
        <!-- slideshow element -->
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

        <!-- gradient overlay for text visibility -->
        <div class="gradient-overlay"></div>

        <div class="hero-overlay">
        <h1 class="hero-title">Welcome to [PROPERTY]!</h1>
        </div>

        <button class="see-photos-btn" @click="openGallery">See all photos</button>

        <!-- gallery display -->
        <div v-if="showGallery" class="modal" @click.self="closeAllModals">
        <div class="gallery-grid">
            <img
            v-for="(img, index) in images"
            :key="img"
            :src="img"
            class="gallery-thumb"
            @click="openSlideshow(index)"
            />
        </div>
        </div>

        <!-- modal slideshow -->
        <div v-if="showSlideshow" class="modal slideshow-modal" @click.self="closeAllModals">
            <img :src="images[slideshowIndex]" class="slideshow-image" />
            <button class="nav left" @click="prevSlide">‹</button>
            <button class="nav right" @click="nextSlide">›</button>
            <button class="close" @click="closeAllModals">×</button>

            <!-- image previews at bottom of slideshow -->
            <div class="thumbnail-strip">
                <img
                    v-for="(img, index) in images"
                    :key="img"
                    :src="img"
                    class="thumbnail-preview"
                    :class="{ active: index === slideshowIndex }"
                    @click.stop="slideshowIndex = index"
                />
            </div>
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

    .gradient-overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.650), transparent);
      z-index: 2;
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

    .see-photos-btn {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    z-index: 2;
    background-color: rgba(0,0,0,0.6);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    }

    .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    }

    .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    max-width: 90%;
    padding: 2rem;
    }

    .gallery-thumb {
    width: 100%;
    height: 120px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.2s ease;
    }

    .gallery-thumb:hover {
    transform: scale(1.05);
    }

    .slideshow-modal {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    }

    .slideshow-image {
    max-width: 90%;
    max-height: 80vh;
    border-radius: 6px;
    }

    .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0);
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    padding: 0 1rem;
    z-index: 11;
    }

    .nav.left {
    left: 2rem;
    }

    .nav.right {
    right: 2rem;
    }

    .close {
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    }

    .thumbnail-strip {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  max-width: 90vw;
  overflow-x: auto;
  padding: 0.5rem 0;
  justify-content: center;
}

.thumbnail-preview {
  height: 60px;
  width: 90px;
  object-fit: cover;
  opacity: 0.6;
  cursor: pointer;
  border: 2px solid transparent;
  transition: opacity 0.3s, border-color 0.3s;
  border-radius: 4px;
}

.thumbnail-preview:hover {
  opacity: 1;
}

.thumbnail-preview.active {
  opacity: 1;
  border-color: white;
}
</style>