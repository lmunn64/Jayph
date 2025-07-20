<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const calendarContainer = ref()
const isWideEnough = ref(false)
const clearDateBtn = useTemplateRef('clear-date-btn')

const selectedDates = defineModel({required: true})

// Check parent container width to determine if show multi-calendar
const checkWidth = () => {
  if (calendarContainer.value && calendarContainer.value.parentElement) {
    const parentWidth = calendarContainer.value.parentElement.offsetWidth
    console.log('Parent width:', parentWidth) // Debug log
    isWideEnough.value = parentWidth >= 900
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
    <div class = "calendarWrapper">
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
@media (max-width: 525px) {
    .calendarContainer {
        --dp-cell-size: 50px;
        --dp-cell-padding: 2px;
    }
}
@media (max-width: 400px) {
    .calendarContainer {
        --dp-cell-size: 40px;
        --dp-cell-padding: 2px;
    }
}

</style>