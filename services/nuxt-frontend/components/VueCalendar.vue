<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { DatePickerInstance } from "@vuepic/vue-datepicker"
import type { Calendar_Date, Calendar } from '~/types/calendar'
import { addDays, max } from 'date-fns';

const date = ref()
const calendarContainer = ref()
const isWideEnough = ref(false)
const clearDateBtn = useTemplateRef('clear-date-btn')
const datepicker = ref<DatePickerInstance>(null);

const emit = defineEmits(['delete-quote-response'])

const selectedDates = defineModel({required: true})

const tempDisabledDates = ref<Date[] | undefined>([])

const tempHighlightedDates = ref<Date[]>([])

const tempHighlightedMaxDate = ref<Date[]>([])

const minStayHighlightedDates = ref<Date[]>([])

const isLoading = ref<boolean>(true)

const maxDate = ref(new Date(new Date().setFullYear(new Date().getFullYear() + 2)))

interface Props {
    forSearch?: boolean 
    cal_data?: Calendar 
}

const props = withDefaults(defineProps<Props>(), {
    forSearch: false
})

// check parent container width to determine if show multi-calendar
const checkWidth = () => {
  if (calendarContainer.value && calendarContainer.value.parentElement) {
    const parentWidth = calendarContainer.value.parentElement.offsetWidth
    const parentHeight = calendarContainer.value.parentElement.offsetHeight

    // for search dropdown, use smaller width threshold
    if (props.forSearch) {
        isWideEnough.value = parentWidth >= 650 // Lower threshold for search
    } else {
        // for PropBooking, keep existing logic
        isWideEnough.value = parentWidth >= 900
    }
  }
}

const handleDateUpdate = (selectedDate : Date[]) => {
    console.log(selectedDate)
    if (selectedDate && Array.isArray(selectedDate) && selectedDate.length === 2) {
        const [startDate, endDate] = selectedDate
        if (startDate && endDate) {
            // Both dates selected - format and update selectedDates
            const formattedDates = [formatSingleDate(startDate), formatSingleDate(endDate)]
            selectedDates.value = [...formattedDates]
            
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

// handle the selection of the first date in a calendar
const handleDateSelection = (selectedDate : Date) =>{
    if(!props.cal_data){
        return
    }
    
    //emit clearQuoteResponse in parent
    emit('delete-quote-response')

    const startDate = formatSingleDate(selectedDate)
    console.log(startDate)

    // Enable clear button
    clearDateBtn.value?.classList.add('set')

    const startDateObj : Calendar_Date | undefined = props.cal_data.dates.find(d => d.date === startDate)

    if(!startDateObj){
        return
    }
  
    const min_stay = startDateObj.min_stay
    
    const startDateIndex = props.cal_data.dates.findIndex(d => d.date === startDate)

    const maxDateIndex : number = props.cal_data.dates.findIndex((d, index, dArr) => index >= startDateIndex && !d.available && (!dArr[index - 1]?.available && !d.closed_for_checkin))
   
    // find the last date that can be selected if it is a checkin only date.
    const checkinHighlightedDate = tempHighlightedDates.value.find(d=> formatSingleDate(d) === props.cal_data?.dates.at(maxDateIndex - 1)?.date)
    if(checkinHighlightedDate)
        tempHighlightedMaxDate.value.push(checkinHighlightedDate)
    
    //add highlighted dates for min stay restrictions
    console.log(min_stay)
    if(min_stay > 1){
        minStayHighlightedDates.value = props.cal_data.dates.filter((d, index, dArr) => index > startDateIndex && index < startDateIndex + min_stay)
        .map(d=> new Date(d.date + 'T00:00:00'))
    }

    tempDisabledDates.value = props.cal_data.dates.filter((d, index, dArr) => index < startDateIndex || (maxDateIndex > 0 && index >= maxDateIndex))
    .map(d => new Date(d.date + 'T00:00:00'))

}

/** Format Date to a string value following "YYYY-MM-DD" */
const formatSingleDate = (date : Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

const clearTempDisabledDates = () => {
    //remove the temp disableds based on startDate
    if(tempDisabledDates.value){
        tempDisabledDates.value = undefined
    }}

const clearDate = () => {
    date.value = null
    if(datepicker.value)
        datepicker.value.clearValue()

    // return the checkin only date to the calendar 
    tempHighlightedMaxDate.value.pop()
    for(var i =0; i < minStayHighlightedDates.value.length; i++){
        minStayHighlightedDates.value.pop()
    }
    
    selectedDates.value = null
    clearTempDisabledDates()

    //emit clearQuoteResponse in parent
    emit('delete-quote-response')
    
    console.log('Dates cleared')
    clearDateBtn.value?.classList.remove('set')
}

/** Grab the unavailable dates from the json calendar data, update on computed anytime tempDisabledDates value updates */
const unavailableDates = computed(() => {
    const base = props.cal_data
        ? props.cal_data.dates
            .filter((d, index, dArr) => (
                !d.available
                && (!dArr[index - 1]?.available && !d.closed_for_checkin)
            ))
            .map(d => new Date(d.date + 'T00:00:00'))
        : []
    return [...base, ...(tempDisabledDates.value || [])]
})

// Only highlight if its not available, the previous date is available, AND the current is NOT closed for check in
const checkInOnly = computed(() => {
 if (!props.cal_data) {
        return []
    }
    // Get all check-in only dates
    const highlighted = props.cal_data.dates
        .filter((d, index, dArr) => (
            !d.available &&
            (dArr[index - 1]?.available && !d.closed_for_checkin)
        ))
        .map(d => new Date(d.date + 'T00:00:00'))

    // Remove any dates that are in tempHighlightedMaxDate.value
    const filtered = highlighted.filter(
        d => !tempHighlightedMaxDate.value.some(
            maxDate => d.getTime() === maxDate.getTime()
        )
    )
    tempHighlightedDates.value = highlighted
    return [...filtered, ...(minStayHighlightedDates.value || [])]
})

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
                    ref="datepicker"
                    v-model="date" 
                    :range="{ noDisabledRange: true }" 
                    :multi-calendars="isWideEnough ? 2 : undefined"
                    inline 
                    auto-apply
                    :enable-time-picker="false"
                    :key="isWideEnough"
                    :highlight="checkInOnly"
                    no-today
                    :locale="'en-GB'"
                    month-name-format="long"
                    :disabled-dates="unavailableDates"
                    prevent-min-max-navigation
                    :min-date="new Date()"
                    :max-date="maxDate"
                    :month-change-on-scroll="false"
                    @update:model-value="handleDateUpdate"
                    @range-start="handleDateSelection"
                />
            </div>
            <button class = "clear-dates-btn" @click="clearDate" ref = 'clear-date-btn'>Clear Dates</button>

    </div>
    
</template>

<style scoped>

.calendarWrapper {
    display: flex;
    flex-direction: column;

    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    container-type: inline-size;
}

.clear-dates-btn{
    margin-top: 10px;
    font-size: larger;
    background-color: transparent;
    border-radius: var(--default-border-radius);
    border-width: 0;
    user-select: none;
    padding:0;
    pointer-events: none;
    color: var(--text-color-dark-disabled);
    width: auto;
    height: 1.7em;
}

.clear-dates-btn.set{
    pointer-events:all;
    cursor: pointer;
    text-decoration: underline;
    color: var(--text-color-dark);
    transition: 250ms;
}

.clear-dates-btn.set:hover{
    color: #0000005e;
    transition: 250ms;
}

.calendarContainer {
    --dp-cell-size: 68px;
    --dp-border-radius: var(--default-border-radius);
    --dp-button-height: 4px;
    --dp-font-size: 1.2rem;
    --dp-cell-border-radius:var(--default-border-radius);
    --dp-menu-min-width: 300px;
    --dp-cell-padding: 8px;
    --dp-two-calendars-spacing: 20px;
    border-radius: var(--default-border-radius);
    box-shadow: var(--primary-box-shadow);
    max-height: calc(100% - 2.7em);
    max-width: 100%;
}

.calendarContainer :deep(.dp__theme_light) {
    --dp-primary-color: rgba(0, 0, 0, 0.74);
    --dp-highlight-color: rgb(25 118 210 / 10%);
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #cccccc;
    --dp-background-color: #ffffff;
    --dp-border-color: #e9ecef;
    --dp-text-color: #212529;
    --dp-hover-color: #daf0fd;
    --dp-menu-border-color: #ffffff;
    --dp-highlight-color: 0
}

.calendarContainer :deep(.dp__inner_nav){
    background-color: #fff;
}

/** Checkin only dates */
.calendarContainer :deep(.dp__calendar_item .dp__cell_highlight){
    cursor:not-allowed;
    pointer-events: none;
    color: #2125298a;

}

/** Don't allow clicks for end start and highlighted (max stay restricted) dates */
.calendarContainer :deep(.dp__calendar_item:has(.dp__cell_highlight)) {
    pointer-events: none !important;
    cursor: not-allowed !important;
}
.calendarContainer :deep(.dp__calendar_header_item) {
    height: auto;
}
/** Calendar dates */
.calendarContainer :deep(.dp__month_year_select) {
    width: auto;
    font-size:18px;
    font-weight: bold;
    padding: 2px;
}
.calendarContainer :deep(.dp__month_year_wrap:not(:has(.dp--arrow-btn-nav))) {
    justify-content: center;

}
.calendarContainer :deep(.dp__calendar_item:has(.dp__range_start)) {
    pointer-events: none !important;
    cursor: not-allowed !important;
}

.calendarContainer :deep(.dp__calendar_item:has(.dp__range_end)) {
    pointer-events: none !important;
    cursor: not-allowed !important;
}

.calendarContainer :deep(.dp__calendar_item:has(.dp__range_between)) {
   background-color: #daf0fd;
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

@container (max-width: 475px) {
    .calendarContainer {
        --dp-cell-size: 58px;
        --dp-cell-padding: 2px;
    }
}
@container (max-width: 425px){
    .calendarContainer {
        --dp-cell-size: 51px;
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