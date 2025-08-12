<!-- 
    Amenities component
    contains:
        - grid-style list of amenities
        - obtained through array of amenities on api call
        - manually-mapped svg icons for each amenity (some have default to circle)
        - cut to 4 rows, 'show all' button, expands to whole list
-->

<script setup lang="ts">
import { categoryLabels, amenityCategories, getAmenityIcon } from '~/composables/amenitiesIcons';
const props = defineProps<{amenities: string[]}>()

const iconMap: Record<string, any> = {}
const screenWidth = ref(window.innerWidth)

function useIcon(icon: any, keys: string[]) {
    keys.forEach(key => {
        iconMap[key] = icon
    })
}
const dropdownOpen = ref(false)
// Organize amenities by categories


const amenitiesRef = ref<HTMLElement | null>(null)

function formatAmenity(text: string): string {
    const customMap: Record<string, string> = {
        ac: "AC",
        bbq_area: "BBQ Area",
        wifi: "Wi-Fi",
        tv: "TV",
        smart_tv: "Smart TV",
        twenty_four_hour_checkin: "24hr Hour Check-In",
        walk_in_shower: "Walk-In Shower",
        carbon_monoxide_detector : "CO2 Detector"
    }

    if (customMap[text]) return customMap[text]

    return text
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const expanded = ref(false)

    const selectedCategory = ref<keyof typeof categoryLabels>('all')

    const categorizedAmenities = computed(() => {
    if (selectedCategory.value === 'all') {
        return props.amenities
    }

    const categoryAmenities = amenityCategories[selectedCategory.value as keyof typeof amenityCategories] || []
    return props.amenities.filter(amenity => categoryAmenities.includes(amenity))
})

// returns the amount of visible amenities in the grid based on window size
const visibleAmenities = computed(() => {
    const amenities = categorizedAmenities.value
    if(screenWidth.value < 450){
        return expanded.value ? amenities : amenities.slice(0, 10)
    }
    return expanded.value ? amenities : amenities.slice(0, 16)
})

const updateWidth = () =>  {
  screenWidth.value = window.innerWidth
}

const scrollToAmenities = () => {
    nextTick(() => {
        if (amenitiesRef.value) {
            amenitiesRef.value.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start',
                inline: 'center'
            })
        }
    })
}

const toggleExpanded = () => {
    expanded.value = !expanded.value
    if (expanded.value) {
        scrollToAmenities()
    }
}

const selectCategory = (category: keyof typeof categoryLabels) => {
    selectedCategory.value = category
    expanded.value = false
    dropdownOpen.value = false
    if (category !== 'all') {
        scrollToAmenities()
    }
}

// Close dropdown when clicking outside
const closeDropdown = () => {
    dropdownOpen.value = false
}

// Get count for each category
const getCategoryCount = (category: string) => {
    if (category === 'all') return props.amenities.length
    const categoryAmenities = amenityCategories[category as keyof typeof amenityCategories] || []
    return props.amenities.filter(amenity => categoryAmenities.includes(amenity)).length
}


onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

</script>

<template>
    <div class = "amenities-header" ref="amenitiesRef">
        <h2>Amenities</h2>
        <div class="filter-dropdown-container">
            <button 
                class="filter-dropdown-toggle"
                @click="dropdownOpen = !dropdownOpen"
                :class="{ active: dropdownOpen }"
            >
                <span>{{ categoryLabels[selectedCategory] }}</span>
                <svg 
                    class="dropdown-arrow" 
                    :class="{ rotated: dropdownOpen }"
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none"
                >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <div v-if="dropdownOpen" class="filter-dropdown-menu">
                <button
                    v-for="([category, label]) in Object.entries(categoryLabels).filter(([category]) => getCategoryCount(category) > 0)"
                    :key="category"
                    class="filter-dropdown-item"
                    :class="{ active: selectedCategory === category }"
                    @click="selectCategory(category as keyof typeof categoryLabels)"
                >
                    <span>{{ label }}</span>
                </button>
            </div>
        </div>
    </div>



    <h3 v-if="selectedCategory !== 'all'" class="category-title">
        {{ categoryLabels[selectedCategory] }}
    </h3>
    <h3 v-else class="category-title">
        All Amenities
    </h3>
    <ul class="amenities-grid">
        <li v-for="item in visibleAmenities" :key="item" class="amenity-item">
            <component :is="getAmenityIcon(item)" class="icon" />
            <span class="amenity-text">{{ formatAmenity(item) }}</span>
        </li>
    </ul>

    <button
        v-if="categorizedAmenities.length > 16"
        class="toggle-btn"
        @click="toggleExpanded"
    >
        {{ expanded ? 'Show less' : `Show more` }}
    </button>

    <p v-if="categorizedAmenities.length === 0" class="no-amenities">
        No amenities in this category.
    </p>
    <div v-if="dropdownOpen" class="dropdown-overlay" @click="closeDropdown"></div>

</template>

<style scoped>
.category-filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 0 3rem;
}
.amenities-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    scroll-margin-top: 100px;
    scroll-behavior: smooth;
    padding-inline: var(--primary-header-inline);
}

.filter-dropdown-container {
    position: relative;
}
.filter-dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    background-color: white;
    cursor: pointer;
    border-radius: var(--secondary-border-radius);
    font-size: 0.9rem;
    transition: all 0.2s ease;
    min-width: 100px;
    justify-content: space-between;
}

.dropdown-arrow {
    transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
    transform: rotate(180deg);
}

.filter-dropdown-menu {
    position: absolute;
    right: 0;
    background: white;
    border:none;
    border-radius: var(--secondary-border-radius);
    box-shadow: var(--primary-box-shadow);    min-width: 210px;
    z-index: 3;
    max-height: 300px;
    overflow-y: auto;
}

.filter-dropdown-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    
}

.filter-dropdown-item:hover {
    background: var(--accent-color);
    color: white;
}

.filter-dropdown-item.active {
    background: var(--accent-color);
    color: white;
    font-weight: 600;
}


.category-title {
    text-align: center;
    margin: 1rem 0;
    color: var(--accent-color);
    font-size: 1.2rem;
}

.dropdown-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 2;
}

.amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem 2rem;
    list-style: none;
    padding: 0 1rem;
    margin: 1rem;
}

.amenity-item {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 1rem;
    color: #333;
}

.icon {
    color: var(--accent-color);
    text-align: center;
    width: 40px;
    flex-shrink: 0;
    margin-right: 0.25rem
}

.toggle-btn {
    padding: 0.5rem 1rem;
    border: none;

    box-shadow: var(--primary-box-shadow);
    cursor: pointer;
    background-color: white;
    border-radius: var(--secondary-border-radius);
    transition: all 0.2s ease;
    margin: 1rem auto;
    display: block;
}

.no-amenities {
    text-align: center;
    font-style: italic;
    color: #666;
    padding: 2rem;
}

@media (max-width: 800px){
    .category-filters{
        display: none;
    }

}
@media (max-width: 450px){
    .amenities-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        gap: 1rem 2rem;
        list-style: none;
        padding: 0 1rem;
        margin: 1rem;
    }
}
</style>