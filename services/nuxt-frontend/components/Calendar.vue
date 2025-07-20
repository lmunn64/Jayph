<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const calendarContainer = ref()
const isWideEnough = ref(false)
const clearDateBtn = useTemplateRef('clear-date-btn')

const selectedDates = defineModel({required: true})

interface Props {
    forSearch?: boolean // New prop to indicate it's for search
}

const props = withDefaults(defineProps<Props>(), {
    forSearch: false
})

// Check parent container width to determine if show multi-calendar
const checkWidth = () => {
  if (calendarContainer.value && calendarContainer.value.parentElement) {
    const parentWidth = calendarContainer.value.parentElement.offsetWidth
    const parentHeight = calendarContainer.value.parentElement.offsetHeight
    console.log('Parent width:', parentWidth) // Debug log
    console.log('Parent height:', parentHeight) // Debug log
    
    // For search dropdown, use different logic
    if (props.forSearch) {
        isWideEnough.value = parentWidth >= 650 // Lower threshold for search
    } else {
        // For PropBooking, keep existing logic
        isWideEnough.value = parentWidth >= 800
    }
  }
}

const handleDateUpdate = (selectedDate : Date[]) => {
    if (selectedDate && Array.isArray(selectedDate) && selectedDate.length === 2) {
        const [startDate, endDate] = selectedDate
        
        if (startDate && endDate) {
            // Both dates selected - format and update selectedDates
            const formattedDates = [formatSingleDate(startDate), formatSingleDate(endDate)]
            selectedDates.value = formattedDates
            
            // Enable clear button
            clearDateBtn.value?.classList.add('set')
            
            console.log('Range selected:', formattedDates)
        }
    } else if (!selectedDate) {
        // Dates cleared
        selectedDates.value = null
        clearDateBtn.value?.classList.remove('set')
    }
}

const formatSingleDate = (date : Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}


const clearDate = () => {
    date.value = null
    selectedDates.value = null
    console.log('Dates cleared')
    clearDateBtn.value?.classList.remove('set')
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
    <div class = "calendarWrapper" :class="{ 'search-calendar': forSearch }">
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
                    @update:model-value="handleDateUpdate"
                />
            </div>
            <button class = "clear-dates-btn" @click="clearDate" ref = 'clear-date-btn'>Clear Dates</button>

    </div>
    
</template>

<style scoped>

.calendarWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    
}

.clear-dates-btn{
    margin-top: 10px;
    font-size: larger;
    background-color: transparent;
    border-radius: 8px;
    border-width: 0;
    padding:0;
    pointer-events: none;
    color: #0000005e;
    width: auto;
    height: 1.7em;
}

.clear-dates-btn.set{
    margin-top: 10px;
    font-size: larger;
    pointer-events:all;
    cursor: pointer;
    background-color: transparent;
    border-radius: 8px;
    border-width: 0;
    text-decoration: underline;
    color: #000000;
    width: auto;
    height: 1.7em;
    transition: 250ms;
}

.clear-dates-btn.set:hover{
    color: #0000005e;
    transition: 250ms;
}

.calendarContainer {
    --dp-cell-size: 65px;
    --dp-border-radius: 3px;
    --dp-button-height: 4px;
    --dp-font-size: 1.2rem;
    --dp-cell-border-radius: 1px;
    --dp-menu-min-width: 300px;
    --dp-cell-padding: 8px;
    --dp-two-calendars-spacing: 20px;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
    max-height: calc(100% - 2.7em);
    max-width: 100%;
}

.calendarContainer :deep(.dp__theme_light) {
    --dp-primary-color: rgba(0, 0, 0, 0.74);
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #cccccc;
    --dp-background-color: #ffffff;
    --dp-border-color: #e9ecef;
    --dp-text-color: #212529;
    --dp-hover-color: #daf0fd;
         --dp-menu-border-color: #ffffff;
    --dp-highlight-color: rgb(25 118 210 / 10%);
}

.calendarContainer :deep(.dp__inner_nav){
    background-color: #fff;
}


.search-calendar .calendarContainer {
    --dp-cell-size: 45px; /* Smaller cells for search dropdown */
    --dp-cell-padding: 3px;
    --dp-font-size: 0.9rem;
    --dp-two-calendars-spacing: 10px; /* Tighter spacing between calendars */

    max-height: 100%;
    max-width: 100%;
    box-shadow: none;
    overflow: hidden;
}

.search-calendar {
    container-type: inline-size;
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
@container (max-width: 525px) {
    .calendarContainer {
        --dp-cell-size: 60px;
        --dp-cell-padding: 2px;
    }
}
@container (max-width: 400px){
    .calendarContainer {
        --dp-cell-size: 40px;
        --dp-cell-padding: 2px;
    }
}

</style>