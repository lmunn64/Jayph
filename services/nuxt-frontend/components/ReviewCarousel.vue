<!-- 
    Review Carousel component
    contains:
        - API fetch for review data
        - displays review cards in horizontally scrolling list
        - focuses on center review, shrinks prev and next
        - list loops back to start
-->
<script setup lang="ts">

import type { Review } from "~/types/property"

const state = reactive({
  reviews: [] as Review[],
  isLoading: true
})

// defining property ID for property pages
const props = defineProps<{
  propertyId?: string
}>()

// if propertyId is defined, will fetch from that property's reviews, otherwise fetch from defualt (first property)
// *(**fetch for no property ID case used for front page, should grab all reviews instead of just the first
const endpoint = props.propertyId
  ? `https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/api_properties/${props.propertyId}/reviews`
  : 'https://az2zhr2dqyzfs3cjwc55p52yje0ncfyj.lambda-url.eu-north-1.on.aws/api_properties/cfa6a066-72e8-4a24-a1e4-e48273983344/reviews'


const { data: reviewsData, error } = await useAsyncData<Review[]>(`reviews-${props.propertyId || 'all'}`, () =>
  $fetch(endpoint)
)

onMounted(() => {
  if (Array.isArray(reviewsData.value)) {
    reviewsData.value.forEach((el: any) => {
      state.reviews.push({
        name: el.name,
        img_src: el.img_src,
        date: el.date,
        platform: el.platform.charAt(0).toUpperCase() + el.platform.slice(1),
        review_content: el.review_content,
        rating: el.rating
      })
    })
    state.isLoading = false
  }
  else {
    console.error('Could not fetch review data')
  }
})

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
  <div v-if="reviewsData?.length">
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
  </div>
  <p v-else>No reviews yet for this property.</p>
</template>

<style scoped>
h1, p {
  text-align: center;
}
.carousel-wrapper {
  overflow-x: scroll;
  position: relative;
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
  padding-bottom: 2rem;
  user-select: none;
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
