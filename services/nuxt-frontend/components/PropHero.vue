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
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 2,
  transition: 1000,
  autoplay: 5000,
  pauseAutoplayOnHover: true,
  height:450,
  wrapAround: true
}

    
    const props = defineProps<{
      images: string[]
    }>()
    const currentIndex = ref(0)
    const showGallery = ref(false)
    const showSlideshow = ref(false)
    const slideshowIndex = ref(0)

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
        }, 5000) // Change image every 5 seconds, loop to start
    })

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
        <!-- <div class="slideshow">
        <img
            v-for="(img, index) in images"
            :key="img"
            :src="img"
            class="hero-image"
            :class="{ active: index === currentIndex }"
            alt="Hero Slide"
        />
        </div> -->
        <div class="slideshow">
          <Carousel v-bind="carouselConfig">
          <Slide v-for="(img, i) in images" :key="i">
            <img :src="img" alt="image">
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
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
                  <img 
                    v-for="(img, index) in row"
                    :key="img"
                    :src="img"
                    class="gallery-thumb"
                    @click="openSlideshow(getGlobalIndex(rowIndex, index))"
                    />
              </div>
            </div>
            <div class="gallery-text">
              <h1>Summary</h1>
              <p>Very cozy & homey apartment- Fantastic location! Walking distance to many KC amenities:
                - 4 blocks to Nelson-Atkins, Kemper & Art Institute (& the beautiful campus)
                - 10 min walk to Westport
                - 3 min drive to the Plaza
                - 10 min drive to Downtown, Sprint Center & Convention Center
                - 2 blocks from Starbucks
                - 2 blocks from the Roasterie

                NO LOCALS without GREAT reviews allowed

                NOTE:  Dining Chairs have been switched out - updated photos coming.</p>
            </div>
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
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
p {
    text-align:center;
}
.hero {
position: relative;
width: 100%;
height: 450px;
overflow: hidden;
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

.carousel {
  --vc-nav-background: rgba(0, 0, 0, 0.7);
  --vc-nav-color: white;
  --vc-nav-color-hover: var(--accent-color);
  --vc-nav-border-radius: 0%;
  --vc-nav-height: 45px;
  --vc-nav-width: 45px;
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

/* .gallery-grid {
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
  border-radius: var(--secondary-border-radius);
  transition: transform 0.2s ease;
} */
.gallery-container {
  display: flex;
  background-color:var(--bg-color);
  padding: 16px;
  overscroll-behavior: contain;
  max-width: 90vw;
}

.gallery-text {
  max-width: 400px;
  padding: 16px;
  color: var(--text-color-dark);
  text-align: center;
}

.gallery-rows {
  max-width: 90%;
  padding: 16px;
  display: flex;
  flex-direction: column;
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
  border-radius: var(--secondary-border-radius);
}

.thumbnail-preview:hover {
  opacity: 1;
}

.thumbnail-preview.active {
  opacity: 1;
  border-color: white;
}
</style>