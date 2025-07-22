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
import VueCalendar from './VueCalendar.vue'
import GuestSelector from './GuestSelector.vue'
import type { Search } from '~/types/booking'

const selectedDates = ref()

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

watch(guestCounts, (newVal) => {
  search.value.adults = newVal.adults
  search.value.children = newVal.children
  search.value.infants = newVal.infants
  search.value.pets = newVal.pets
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

// function to toggle dropdowns
function toggleDropdown(index: number, event: MouseEvent) {
  const wasOpen = showDropdowns.value[index]
  showDropdowns.value = [false, false, false]

  if (!wasOpen) {
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    dropdownAbove.value[index] = spaceBelow < 200
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

function searchListings (input: Search){
    // redirect to search results page
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

</script>

<template>
    <div class="listing-container">
        <h1 class="title">Find your stay.</h1>
        <div class="btn-container">
            <div class="dropdown">
                <button class="input" @click="(e) => toggleDropdown(0, e)"> {{ search.location ? search.location : 'Location' }}</button>
                <div v-if="showDropdowns[0]" :class="{ menu: true, above: dropdownAbove[0] }">
                    <button @click="setLocation('Branson West')">Branson West</button>
                    <button @click="setLocation('Kansas City')">Kansas City</button>
                </div>
            </div>
            <div class="dropdown">
                <button class="input" @click="(e) => toggleDropdown(1, e)">
                    Check-in → Check-out
                </button>
                <div v-if="showDropdowns[1]" :class="['menu', 'date-menu', { above: dropdownAbove[1] }]">
                    <VueCalendar v-model="selectedDates" :for-search="true"/>
                </div>
            </div>
            <div class="dropdown">
                <button class="input" @click="(e) => toggleDropdown(2, e)"> {{ guestSummary }} </button>
                <div v-if="showDropdowns[2]" :class="{ menu: true, above: dropdownAbove[2] }">
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
    top: 0;
    left: 0;
    height: 200px;
    background-color: var(--primary-color);
    color: var(--text-color-light);
}
.title {
    text-align: center;
    padding-top: 1rem;
}
.btn-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.btn-container button {
    font-size: 1em;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    outline: none;
    cursor: pointer;
    transition: 0.2s ease;
}
.input {
    text-align: left;
    border: 0px;
    height: 58px;
    padding-inline: 40px;
    width: 15vw;
    background-color: white;
    color: var(--text-color-dark);
}

.dropdown {
  position: relative;
}

.menu {
  margin-top: 8px;
  position: absolute;
  border-radius: 16px;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  width: 15vw;
  overflow: hidden;
  top: 100%; /* default: below the button */
  left: 0;
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
    min-height: calc(350px + 3rem);
    max-height: calc(395px + 3rem); /** since rows are 45 pixels more, account for extra row in max */
    height: auto;
    justify-content: center;
}
.search {
    border: 2px solid white;
    background-color: var(--accent-color);
    color: var(--text-color-light);
}
.search:hover {
    background-color: var(--highlight-color);
}

@media (max-width: 850px) {
  .listing-container {
    height: 400px;
  }
  .btn-container {
    flex-direction: column;
    align-items: center;   
  }
  .btn-container button {
    width: 90vw;  
    max-width: 400px;
  }
  .menu {
    width: 90vw !important;  
    max-width: 400px !important;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>