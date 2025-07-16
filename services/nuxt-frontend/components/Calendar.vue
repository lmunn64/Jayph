<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const calendarContainer = ref()
const isWideEnough = ref(false)

// Check parent container width to determine if show multi-calendar
const checkWidth = () => {
  if (calendarContainer.value && calendarContainer.value.parentElement) {
    const parentWidth = calendarContainer.value.parentElement.offsetWidth
    console.log('Parent width:', parentWidth) // Debug log
    isWideEnough.value = parentWidth >= 615
  }
}

onMounted(() => {
  nextTick(() => {
    checkWidth()
  })
  window.addEventListener('resize', checkWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWidth)
})
</script>

<template>
  <div class="calendarContainer" ref="calendarContainer">
    <VueDatePicker 
      v-model="date" 
      range 
      :multi-calendars="isWideEnough ? 2 : undefined"
      inline 
      auto-apply
      :enable-time-picker="false"
      :key="isWideEnough"
    />
  </div>
</template>

<style scoped>
</style>