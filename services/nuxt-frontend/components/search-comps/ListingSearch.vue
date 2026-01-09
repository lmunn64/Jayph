<!-- 
    Component for listing search function
    Contains:
        - Location button for city filtering
        - Date selection button for stay length
        - Guest selection for # people staying
        - Each option displayed in dropdown menu
        - Buttons stack on mobile displays
-->

<script setup lang="ts">
import { VueCalendar } from '#components'
import { GuestSelector } from '#components'
import type { Search } from '~/types/booking'
import { formatSingleDate } from '~/composables/useDateUtils'
import { select } from '#build/ui'
import { User, CalendarDays, MapPin} from 'lucide-vue-next';

const route = useRoute()

const selectedDates = ref<string[]>()
const options = {
  year: "numeric" as const,
  month: "short" as const,
  day: "numeric" as const
}
const props = defineProps<{
    location?: string,
    checkinDate?: string,
    checkoutDate?: string,
    adults?: number,
    children?: number,
    infants?: number,
    pets?: number
}>()

const search = ref<Search>({
    location: '',
    checkinDate: '',
    checkoutDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
})

// object to sync with GuestSelector which then syncs to search via watch function
const guestCounts = ref({
  adults: 2,
  children: 0,
  infants: 0,
  pets: 0
})

const mobileSearchOpen = ref<boolean>(false)
const transitioning_mobile = ref(false)

// Check if we're on the index page
const isIndexPage = computed(() => route.name === 'index')

/** watcher for when mobile dropdown is transitioning  */
watch(mobileSearchOpen, (val) => {
  transitioning_mobile.value = true
  setTimeout(() => {
    transitioning_mobile.value = false
  }, 700) 
})

/** watcher for dates and guest counts */
watch([guestCounts, selectedDates], ([newGuests, newDates]) => {
  search.value.adults = newGuests.adults
  search.value.children = newGuests.children
  search.value.infants = newGuests.infants
  search.value.pets = newGuests.pets
  console.log(newDates)
  if(newDates && Array.isArray(newDates) && newDates.length >= 2){
    search.value.checkinDate = newDates[0]
    search.value.checkoutDate = newDates[1]
  }
  else {
    search.value.checkinDate = ''
    search.value.checkoutDate = ''
  }
  console.log(search.value)
})

// compute button content when updating num guests
const guestSummary = computed(() => {
  const parts = []

  if (guestCounts.value.adults > 0) parts.push(`${guestCounts.value.adults} Adult${guestCounts.value.adults > 1 ? 's' : ''}`)
  if (guestCounts.value.children > 0) parts.push(`${guestCounts.value.children} Child${guestCounts.value.children > 1 ? 'ren' : ''}`)
  if (guestCounts.value.infants > 0) parts.push(`${guestCounts.value.infants} Infant${guestCounts.value.infants > 1 ? 's' : ''}`)
  if (guestCounts.value.pets > 0) parts.push(`${guestCounts.value.pets} Pet${guestCounts.value.pets > 1 ? 's' : ''}`)

  return parts.length > 0 ? parts.join(', ') : 'Guests'
})

// all dropdowns default to being closed, show below
const showDropdowns = ref([false, false, false])
const dropdownAbove = ref([false, false, false])

// function to toggle dropdowns, adds visible class into template
function toggleDropdown(index: number, event: MouseEvent) {
  const wasOpen = showDropdowns.value[index]
  showDropdowns.value = [false, false, false]

  if (!wasOpen) {
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    dropdownAbove.value[index] = spaceBelow < 320
    showDropdowns.value[index] = true
  }
}

// close dropdowns on outside click
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    showDropdowns.value = [false, false, false]
  }
}

function setLocation (loc: string) {
    search.value.location = loc
    showDropdowns.value = [false, false, false]
}

function buildQueryParams(search: Search): string {
  const params = new URLSearchParams()

  if (search.adults) params.append('adults', search.adults.toString())
  if (search.children) params.append('children', search.children.toString())
  if (search.infants) params.append('infants', search.infants.toString())
  if (search.pets) params.append('pets', search.pets.toString())
  if (search.location) params.append('location', search.location)
  /** set dates to selected search dates, or format new dates from today to 5 days from today */
  var startDate : string = ""
  var endDate : string = ""
  if (search.checkinDate) 
    startDate = search.checkinDate
  else  
    startDate = formatSingleDate(new Date())
  if (search.checkoutDate) 
    endDate =  search.checkoutDate
  else {
    const fiveDays : Date = new Date()
    fiveDays.setDate(fiveDays.getDate() + 5)
    endDate =  formatSingleDate(fiveDays)
  }
  search.checkinDate = startDate
  search.checkoutDate = endDate
  params.append('start_date', startDate)
  params.append('end_date', endDate)
  return params.toString()
}

const router = useRouter()

function searchListings(search: Search) {
  const query = buildQueryParams(search)
  router.push(`/search-results?${query}`)
}

/** Format a YYYY-MM-DD date to locale string (e.g. Aug XX, 20XX) */
const formattedDatetoLocale = (date : string) : string =>{
  //assume YYYY-MM-DD
  const toFormat : Date = new Date(date + 'T00:00:00')
  return toFormat.toLocaleDateString(undefined, options)
}

// if there are check in or check out props sent, fill em up in ref
if (props.checkinDate) {
  search.value.checkinDate = props.checkinDate
}
if (props.checkoutDate) {
  search.value.checkoutDate = props.checkoutDate
}
if (props.checkinDate && props.checkoutDate) {
  selectedDates.value = [props.checkinDate, props.checkoutDate]
}

// initialize location from props if provided
if (props.location) {
  search.value.location = props.location
}

// initialize guest counts from props if provided
guestCounts.value = {
  adults: props.adults ?? guestCounts.value.adults,
  children: props.children ?? guestCounts.value.children,
  infants: props.infants ?? guestCounts.value.infants,
  pets: props.pets ?? guestCounts.value.pets
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

// Toggle function for mobile searching
const toggleSearchOpen = () =>{
  mobileSearchOpen.value = !mobileSearchOpen.value
}

</script>

<template>
    <div class="listing-container" :class = "{'mobile-expanded' : mobileSearchOpen ,'overflow-hidden': transitioning_mobile,'fixed-position': !isIndexPage,
        'absolute-position': isIndexPage} ">
              <button 
            v-if="mobileSearchOpen" 
            class="close-btn" 
            @click="toggleSearchOpen()"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <h2 class="title">Find your stay.</h2>

        <div class = "mobile-toggle-container">
          <button class = "mobile-toggle-btn" :class = "{'hidden' : mobileSearchOpen}" @click = "toggleSearchOpen()">Search Properties</button>         
        </div>
        <div class="btn-container">
            <div class="dropdown">
                <button class="input" @click="(e) => toggleDropdown(0, e)"> 
                  <MapPin class = "icon"/> 
                  {{ search.location ? search.location : 'Location' }}
                </button>
                <div :class="{ menu: true, above: dropdownAbove[0], visible : showDropdowns[0] }">
                    <button @click="setLocation('Branson West')">Branson West</button>
                    <button @click="setLocation('Kansas City')">Kansas City</button>
                </div>
            </div>
            <div class="dropdown">
                <button class="input" @click="(e) => toggleDropdown(1, e)">
                    <CalendarDays class = "icon"/>
                    {{search.checkinDate && search.checkoutDate ? `${formattedDatetoLocale(search.checkinDate)} → ${formattedDatetoLocale(search.checkoutDate)}` : "Check-in → Check-out"}}
                </button>
                <div :class="['menu', 'date-menu', { above: dropdownAbove[1], visible: showDropdowns[1] }]">
                    <VueCalendar v-model="selectedDates" :for-search="true"/>
                </div>
            </div>
            <div class="dropdown">
               
              <button class="input" @click="(e) => toggleDropdown(2, e)">
                <User class = "icon"/> 
                {{ guestSummary }} 
                
              </button>
              <div :class="{ menu: true, above: dropdownAbove[2], visible : showDropdowns[2] }">
                    <GuestSelector v-model="guestCounts" />
              </div>
            </div>
            <button class="search" @click="searchListings(search)">
                Search
            </button>
        </div>
    </div>
</template>

<style scoped>
.listing-container {
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  height: 150px;
  width: 100%;
  z-index: 10;
  backdrop-filter: var(--blur);
  background-color: var(--primary-color-20);
  color: var(--text-color-light);
}
.listing-container.fixed-position {
  background-color: var(--primary-color);
  backdrop-filter: none;
  position: relative;
  bottom: auto;
  z-index: 1;
}
.close-btn {
  position: absolute;
  top: .75em;
  right: .75rem;
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 0.29);
  border: none;
  border-radius: 30%;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--text-color-dark);
  transition: all 0.2s ease;
  z-index: 20;
}
.mobile-toggle-container {
    display: none;
}
.mobile-toggle-btn{
  font-size: 1em;
  border-radius: var(--default-border-radius);
  outline: none;
  cursor: pointer;
  transition: opacity 3s ease, visibility 3s ease;
  border: 0px;
  height: 50px;
  width: 45vw;
  max-width: 225px;
  background-color: white;
  color: var(--text-color-dark);
}
.title {
  text-align: center;
  padding-top: 1rem;
  font-weight: 200;
  padding-bottom: 1rem;
  margin: 0
}
.btn-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn-container button {
  font-size: 1em;
  width: auto;
  padding: 0.5rem 1rem;
  border-radius: var(--default-border-radius);
  outline: none;
  cursor: pointer;
  transition: 0.2s ease;
}

.input {
  display: flex;
  align-items: center;
  gap: .5em;
  text-align: left;
  border: 0px;
  height: 58px;
  padding-inline: 20px;
  min-width: 20vw;
  background-color: white;
  color: var(--text-color-dark);
}

.dropdown {
  position: relative;
}

.menu {
  margin-top: 8px;
  position: absolute;
  border-radius: var(--default-border-radius);
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  width: fit-content;
  min-width: 300px;
  overflow: hidden;
  /** hiding menu by default now */
  opacity: 0;
  visibility: hidden;
  top: 100%; /* default: below the button */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.menu.above {
  top: auto;
  bottom: 100%; /* position above the button */
  margin-top: 0;
  margin-bottom: 8px;
}

.menu-below {
  margin-top: 8px;
  top: 100%;
}

.menu.visible {
  opacity: 1;
  visibility: visible;
}

.menu button {
  margin: 0;
  border: none;
  background: white;
  text-align: left;
  overflow: hidden;
  border-radius: 0px;
  width: 100%;
  padding: 1rem 1rem;
  color: var(--text-color-dark);
  cursor: pointer;
}

.menu button:hover {
  background-color: var(--highlight-color);
  color: var(--text-color-light);
}
.date-menu {
    display: flex;
    width: 700px;  
    min-height: calc(330px + 3rem);
    max-height: calc(395px + 3rem); /** since rows are 45 pixels more, account for extra row in max */
    height: auto;
    justify-content: center;
}
.search {
    border: 0px solid white;
    background-color: var(--accent-color);
    color: var(--text-color-light);
}
.search:hover {
    background-color: var(--highlight-color);
}

@media (max-width: 850px) {
  .title{
    font-size: var(--paragraph-text-size);
  }
  .listing-container {
    height: 125px;
    transition: all .4s ease;
  }

  .listing-container.mobile-expanded {
    height: 350px;
    transition: all .7s ease;
  }

  .listing-container.overflow-hidden {
    overflow: hidden;
  }

  /** unhide the mobile toggle */
  .mobile-toggle-container{
    justify-content: center;
    gap: 1rem;
    display: flex;
  }

  .mobile-toggle-btn.hidden{
    justify-content: center;
    gap: 1rem;
    display: none;
  }

  .mobile-toggle-down{
    cursor: pointer;
  }
  .mobile-toggle-down.hidden{
    display: none;
  }
  
 .btn-container {
    opacity: 0;
    visibility: hidden;
    flex-direction: column;
    align-items: center;
  }
  
  .mobile-expanded .btn-container {
    opacity: 1;
    visibility: visible;
    transition: opacity 2s ease, visibility 0.3s ease, transform 0.3s ease;
  }
  .btn-container button {
    width: 90vw;
    max-width: 400px;
  }

  .close-btn {
    display: flex;
  } 
  .menu {
    width: 90vw !important;  
    max-width: 400px !important;
    visibility: hidden;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
  }
}

</style>