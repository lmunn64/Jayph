<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const calendarContainer = ref()
const isWideEnough = ref(false)

const selectedDates = ref()
// Check parent container width to determine if show multi-calendar
const checkWidth = () => {
  if (calendarContainer.value && calendarContainer.value.parentElement) {
    const parentWidth = calendarContainer.value.parentElement.offsetWidth
    console.log('Parent width:', parentWidth) // Debug log
    isWideEnough.value = parentWidth >= 800
  }
}

// Format selected dates
const format = (dates: Date[]) => {
    if (!dates) return 'Select dates'
    
    const [startDate, endDate] = dates

    if (!startDate) return 'Select start date'
    if (!endDate) return `${formatSingleDate(startDate)} - Select end date`
    selectedDates.value = [formatSingleDate(startDate), formatSingleDate(endDate)]
    return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`
  
}
const formatSingleDate = (date : Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
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
        no-today
        :min-date="new Date()"
        :format = "format"
    />
  </div>
</template>

<style scoped>
/* Calendar styling */
.calendarContainer {
    /* Define custom properties on the container */
    --dp-cell-size: 50px;
    --dp-border-radius: 3px;
    --dp-button-height: 4px;
    --dp-font-size: 1.2rem;
    --dp-cell-border-radius: 1px;
    --dp-menu-min-width: 300px;
    --dp-cell-padding: 8px;
    --dp-two-calendars-spacing: 20px;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

.calendarContainer :deep(.dp__theme_light) {
    --dp-primary-color: rgba(0, 0, 0, 0.74);
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #cccccc;
    --dp-background-color: #ffffff;
    --dp-border-color: #e9ecef;
    --dp-text-color: #212529;
    --dp-hover-color: #daf0fd;
    --dp-highlight-color: rgb(25 118 210 / 10%);
}

.calendarContainer :deep(.dp__inner_nav){
    background-color: #fff;
}

 .calendarContainer :deep(.dp__calendar_item[aria-disabled="true"]) {
    pointer-events: none;
    text-decoration:line-through;
    cursor: not-allowed;
    color:#cccccc;
}
.calendarContainer :deep(.dp__month_year_select){
    pointer-events: none;
}
@media (max-width: 400px) {
    .calendarContainer {
        --dp-cell-size: 45px;
        --dp-cell-padding: 2px;
    }
}
</style>