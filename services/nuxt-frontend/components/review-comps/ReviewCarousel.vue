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

const propertyStore = usePropertyStore()

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


if(props.propertyId){
  await useAsyncData(`reviews-${props.propertyId}`, () => propertyStore.fetchReviews(props.propertyId!), { server: true })
}

const reviews = computed<Review[]>(()=>{
  if(props.propertyId){
    if (propertyStore.property_reviews[props.propertyId]){
      state.isLoading = false
      return propertyStore.property_reviews[props.propertyId]
      
    }
    state.isLoading = true
  }
  state.isLoading = false
  return index_reviews
})
</script>

<template>
 <div class = "review-carousel"v-if="reviews?.length && !state.isLoading">
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
      <SwiperSlide v-for="review in reviews" :key="review.name">
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
