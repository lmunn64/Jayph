<!-- 
    Hero component for property pages
    Contains:
        - navigatable carousel slideshow (autoplay/looping)
        - 'see all photos' button
          - when clicked, displays photos in zillow-style rows
          - summary and 'book now' button displayed alongside gallery
          - selecting a photo from this grid will allow for manual
            scrolling with image previews at the bottom
-->

<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/autoplay'
    import 'swiper/css/navigation';
    import 'swiper/css/effect-coverflow'
    const modules = [Navigation, Autoplay ,EffectCoverflow]
    
    const props = defineProps<{
      summary: string
      images: string[]
    }>()
    const currentIndex = ref(0)
    const showGallery = ref(false)
    const showSlideshow = ref(false)
    const slideshowIndex = ref(0)

    // gallery row organization
    const chunkSizes = [1,2]  // pattern of imgs per row
    const chunkedImages = computed(() => { // groups imgs by rows
      const result: string[][] = []
      let i = 0
      let toggle = 0 // alter between chunk sizes
      const imgs = props.images
      while (i < imgs.length) {
        let size = chunkSizes[toggle % chunkSizes.length]
        if (i + size > imgs.length) {
          size = imgs.length - i // handle 2-row when only 1 image left
        }
        result.push(imgs.slice(i, i + size))
        i += size
        toggle++
      }
      return result
    })


    onMounted(() => {
        setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % props.images.length
        }, 5000) // change image every 5 seconds, loop to start
    })

    // fix for redirecting to correct image on gallery
    function getGlobalIndex(rowIndex: number, index: number): number {
      let count = 0
      for (let i = 0; i < rowIndex; i++) {
        count += chunkedImages.value[i].length
      }
      return count + index
    }

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
      slideshowIndex.value = (slideshowIndex.value + 1) % props.images.length
    }

    function prevSlide() {
      slideshowIndex.value = (slideshowIndex.value - 1 + props.images.length) % props.images.length
    }

    // for scrolling to booking section in parent
    const emit = defineEmits<{
      (e: 'scroll-to-section'): void
    }>()

    function scrollToBooking() {
      closeAllModals()
      emit('scroll-to-section')
    }

    // constrain body scrolling on modals
    watch(showGallery, (val) => {
      if (val) {
        document.body.style.overflow = 'hidden'  // disable body scroll
      } else {
        document.body.style.overflow = ''       // enable body scroll
      }
    })
</script>

<template>
    <div class="hero">
        <!-- slideshow element -->

        <div class="swiper">
          <Swiper
            :modules="modules"
            :slides-per-view="1.5"
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
            :navigation="{ enabled : true }"
            :breakpoints="{
              768: {
                slidesPerView: 3,
              },
              1250: {
                slidesPerView: 4,
              },
            }"
          >
            <SwiperSlide v-for="(img, i) in images" :key="i">
              <img draggable="false" :src="img" alt="image">
            </SwiperSlide>
          </Swiper>
        </div>

        <button class="see-photos-btn" @click="openGallery">See all photos</button>

        <!-- gallery display -->
        <div v-if="showGallery" class="modal" @click.self="closeAllModals">
        <div class="gallery-container">
            <div class="gallery-rows">
              <div
                v-for="(row, rowIndex) in chunkedImages"
                :key="rowIndex"
                class="gallery-row"
                :class="{single: row.length === 1, double: row.length ===2 }"
                >
                  <img draggable="false"
                    v-for="(img, index) in row"
                    :key="img"
                    :src="img"
                    class="gallery-thumb"
                    @click="openSlideshow(getGlobalIndex(rowIndex, index))"
                    />
              </div>
            </div>
            <div class="gallery-text">
              <h1>About the Property</h1>
              <p> {{ summary }} </p>
              <button @click="scrollToBooking()">Book Now</button>
            </div>
          </div>
        </div>

        <!-- modal slideshow -->
        <div v-if="showSlideshow" class="modal slideshow-modal" @click.self="closeAllModals">
            <img :src="images[slideshowIndex]" class="slideshow-image" draggable="false"/>
            <button class="nav left" @click="prevSlide">‹</button>
            <button class="nav right" @click="nextSlide">›</button>
            <button class="close" @click="closeAllModals">×</button>

            <!-- image previews at bottom of slideshow -->
            <div class="thumbnail-strip">
                <img draggable="false"
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
/* height: 450px; */
overflow: hidden;
}

.swiper {
  position: relative;
}
.swiper-slide {
  aspect-ratio: 4 / 3; 
}

.swiper-slide img {
  width: 100%;
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

:deep(.swiper-button-next) {
  color: var(--accent-color);
  right: 0px;
}

:deep(.swiper-button-prev) {
  color: var(--accent-color);
  left: 0px;
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
  border-radius: var(--secondary-border-radius);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* cover navbar */
  overscroll-behavior: contain;
}

.gallery-container {
  display: flex;
  background-color:var(--bg-color);
  padding: 16px;
  overscroll-behavior: contain;
  max-width: 90vw;
  border-radius: var(--secondary-border-radius);
}

.gallery-text {
  max-width: 400px;
  padding: 16px;
  color: var(--text-color-dark);
  text-align: center;
  position: relative;
}

.gallery-text button{
  padding: 16px;
  border: none;
  background-color: var(--accent-color);
  color: var(--text-color-light);
  width: 100%;
  border-radius: var(--secondary-border-radius);
  /* margin-top: 100%; */
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.gallery-rows {
  max-width: 90%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: var(--secondary-border-radius);
  gap: 16px;
  max-height: 85vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.gallery-row.single {
  display: flex;
  justify-content: center;
}

.gallery-row.double {
  display:flex;
  justify-content: space-between;
  gap: 1rem;
}

.gallery-thumb {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  cursor: pointer;
  border-radius: var(--secondary-border-radius);
  transition: transform 0.2s ease;
  max-width: 100%;
}

.gallery-row.double .gallery-thumb {
  width: 49%;
}

.gallery-thumb:hover {
  transform: scale(1.03);
}

.slideshow-modal {
  background-color: rgb(15, 15, 15);
  /* margin-top: 40px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.slideshow-image {
  max-width: 90%;
  max-height: 80vh;
  border-radius: var(--secondary-border-radius);
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
  /* justify-content: center; */
}

.thumbnail-preview {
  height: 60px;
  width: 90px;
  object-fit: cover;
  opacity: 0.6;
  cursor: pointer;
  border: 2px solid transparent;
  transition: opacity 0.3s, border-color 0.3s;
  border-radius: var(--secondary-border-radius);
}

.thumbnail-preview:hover {
  opacity: 1;
}

.thumbnail-preview.active {
  opacity: 1;
  border-color: white;
}

@media (max-width: 750px){
  .hero {
    /* height: 250px; */
  }
  .gallery-container{
    border-radius: var(--default-border-radius);
    max-height: 80vh;
    flex-direction: column;
    gap: 32px;
  }
  .gallery-rows {
    max-width: 100%;
    padding: 0px;
  }
  .gallery-thumb {
    max-height: 120px;
  }
  .gallery-text p, h1{
    display: none;
  }
  .gallery-text button {
    outline: 8px solid var(--bg-color);
  }
  .slideshow-image {
    height: auto;
  }
  .nav {
    top: 90%;
  }
}
</style>