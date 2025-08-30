<!-- 
    Review Carousel component
    contains:
        - API fetch for review data
        - displays review cards in horizontally scrolling list
        - focuses on center review, shrinks prev and next
        - list loops back to start
-->
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import type { Review } from "~/types/property"
const modules = [Pagination, Navigation, EffectCoverflow]
import index_reviews from '~/public/static/index-reviews.json' 
import type { Swiper as SwiperClass } from 'swiper/types'

const state = reactive({
  reviews: [] as Review[],
  isLoading: true
})

const swiperRef = ref<SwiperClass | null>(null)

const onSwiper = (swiper: SwiperClass) => {
  swiperRef.value = swiper
}

const toggleReview = () => {
  // Wait for DOM to update, then recalc Swiper height
  requestAnimationFrame(() => {
    swiperRef.value?.updateAutoHeight(300) // 300ms animation
  })
}

// defining property ID for property pages
const props = defineProps<{
  propertyId?: string
}>()

// if propertyId is defined, will fetch from that property's reviews, otherwise fetch from defualt (first property)
// *(**fetch for no property ID case used for front page, should grab all reviews instead of just the first
const endpoint = props.propertyId
  ? `https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${props.propertyId}/reviews`
  : 'https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/cfa6a066-72e8-4a24-a1e4-e48273983344/reviews'


const { data: reviewsData, error } = await useAsyncData<Review[]>(`reviews-${props.propertyId || 'all'}`, async () => {
  if(props.propertyId !== undefined){
     const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error('Failed to fetch reviews')
    }
    return response.json()
  }
  else {
    return index_reviews
  }
})

onMounted(() => {
  if (Array.isArray(reviewsData.value)) {
    state.reviews = reviewsData.value?.map((el : Review) => ({
      name: el.name,
      img_src: el.img_src,
      date: el.date,
      platform: el.platform.charAt(0).toUpperCase() + el.platform.slice(1),
      review_content: el.review_content,
      rating: el.rating
    }))
    state.isLoading = false
  }
  else {
    console.error('Could not fetch review data')
  }
})
</script>

<template>
 <div class = "review-carousel"v-if="reviewsData?.length && !state.isLoading">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :centered-slides="true"
      @swiper="onSwiper"
      :loop="true"
      :effect="'coverflow'"
      :grab-cursor="true"
      :auto-height="true"
      :coverflow-effect="{
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      }"
      :pagination="{ enabled: false }"
      :navigation="{ enabled : true }"
      :breakpoints="{
        768: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
        1250: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }"
      class="review-swiper"
    >
      <SwiperSlide v-for="review in state.reviews" :key="review.name">
        <ReviewCompsReviewCard v-bind="review"  @toggle = "toggleReview" />
      </SwiperSlide>
    </Swiper>
  </div>
    
  <p v-else>No reviews yet for this property.</p>
</template>

<style scoped>
h1, p {
  text-align: center;
}
.review-carousel{
  overflow: hidden;
  height: fit-content;
}
.swiper {
  padding: 0 90px; /* space for arrows */
  position: relative;
  
}

@media (max-width: 1250px){
  .swiper {
    padding: 0 0px; 
    position: relative;
  }
}

:deep(.swiper-button-next) {
  color: var(--accent-color);
  right: 0px;
}

:deep(.swiper-button-prev) {
  color: var(--accent-color);
  left: 0px;
}
:deep(.swiper-pagination-bullet){
   background-color: var(--accent-color);
}
</style>
