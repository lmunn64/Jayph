<script setup lang="ts">

import type { Review } from "~/types/property"

const state = reactive({
  reviews: [] as Review[],
  isLoading: true
})

const { data: reviewsData } = await useAsyncData('reviews', () =>
  $fetch('https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/properties/d90a7eb9-36e3-4a8e-b908-8106c30dc073/reviews')
)

onMounted(() => {
  if (Array.isArray(reviewsData.value)) {
    reviewsData.value.forEach((el: any) => {
      state.reviews.push({
        name: "el.name",
        img_src: el.img_src ?? "",
        date: "el.responded_at",
        platform: el.platform,
        review_content: el.review,
        rating: el.rating
      })
    })
    state.isLoading = false
  }
  else {
    console.error('Could not grab reviews')
  }
})

// const reviews = ref<Review[]>([
//   {
//     name: 'John Doe',
//     img_src: 'https://styles.redditmedia.com/t5_8ajl6g/styles/communityIcon_ootntw58i8ue1.png',
//     date: 'May 2025',
//     provider: 'Airbnb',
//     review_content: '1 Jaymi was very easy to work with and very personable. They are great recommendations and was excellent at communication. The house was beautiful and felt like home. Local to everything we needed and was very clean. Grateful for the experience and the home.',
//     rating: 5
//   }
// ])

const currentIndex = ref(0)
const len = computed(() => state.reviews.length)
const cardWidth = 650 + 16
const carouselRef = ref<HTMLDivElement | null>(null)

// copying reviews for constant center padding
const extendedReviews = computed(() => [...state.reviews, ...state.reviews, ...state.reviews])

function scrollToIndex(idx: number) {
  if (!carouselRef.value) return
  const scrollPos = (idx + len.value) * cardWidth - (carouselRef.value.clientWidth - cardWidth) / 2
  carouselRef.value.scrollTo({ left: scrollPos, behavior: 'smooth' })
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % len.value
  scrollToIndex(currentIndex.value)
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + len.value) % len.value
  scrollToIndex(currentIndex.value)
}

onMounted(() => {
  nextTick(() => scrollToIndex(currentIndex.value))
})

watch(currentIndex, () => {
  scrollToIndex(currentIndex.value)
})
</script>

<template>
  <h1> Reviews </h1>
  <div class="carousel-wrapper" v-if="!state.isLoading">
    <button class="nav-btn prev" @click="prev">‹</button>

    <div class="carousel" ref="carouselRef">
      <div
        v-for="(review, i) in extendedReviews"
        :key="`${review.name}-${i}`"
        class="carousel-card"
        :class="{ centered: (i - len) === currentIndex }"
        :style="{
          transform: (i - len) === currentIndex ? 'scale(1)' : 'scale(0.65)',
          opacity: (i - len) === currentIndex ? 1 : 0.5,
          transition: 'transform 0.3s ease, opacity 0.3s ease'
        }"
      >
        <ReviewCard v-bind="review" />
      </div>
    </div>

    <button class="nav-btn next" @click="next">›</button>
  </div>

  <div v-else class="loading-text">
    Loading reviews...
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.carousel-wrapper {
  position: relative;
  width: 90vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  background: var(--accent-color);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0 1rem;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.carousel {
  overflow-x: scroll;
  scroll-behavior: smooth;
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none; 
  width: 100%;
  scroll-snap-type: x mandatory;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-card {
  scroll-snap-align: center;
  flex: 0 0 auto;
  width: 650px;
  will-change: transform, opacity;
  user-select: none;
}
</style>
