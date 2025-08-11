<!-- 
    Amenities component
    contains:
        - grid-style list of amenities
        - obtained through array of amenities on api call
        - manually-mapped svg icons for each amenity (some have default to circle)
        - cut to 4 rows, 'show all' button, expands to whole list
-->

<script setup lang="ts">
    import { 
        Check,
        Snowflake,
        UtensilsCrossed,
        Gamepad2,
        Sparkles,
        Book,
        Fan,
        Coffee,
        SoapDispenserDroplet,
        Table,
        Package,
        Flame,
        FireExtinguisher,
        Heart,
        Car,
        Dumbbell,
        Blend,
        Laptop,
        Bath,
        Armchair,
        Waves,
        Tv,
        Wine,
        Wifi,
        Baby as BabyIcon,
        Key,
        Lightbulb,
        DoorClosed,
        Zap,
        Sofa,
        Bed,
        AlertTriangle,
        PuzzleIcon,
        Circle,
        Home,
        Shirt,
        Droplets,
        Wind,
        ShowerHead,
        Microwave,
        WashingMachine,
        ChefHat,
        Shield,
        Tally4,
        MapPin,
        Trees,
        ParkingCircle,
        Music,
        Users,
        Mic,
        CookingPot,
        HandPlatter,
        LifeBuoy
    } from 'lucide-vue-next'

    const props = defineProps<{
    amenities: string[]
    }>()

    const iconMap: Record<string, any> = {}

    function useIcon(icon: any, keys: string[]) {
        keys.forEach(key => {
            iconMap[key] = icon
        })
    }
    const dropdownOpen = ref(false)
    // Organize amenities by categories
    const amenityCategories = {
        common: [
            'essentials', 'bed_linens', 'extra_pillows_and_blankets', 'hangers', 
            'iron', 'laptop_friendly_workspace', 'tv', 'smart_tv', 'wifi', 
            'wireless_internet', 'internet', 'books', 'board_games','game_console', 'arcade_machine', 'pool_table', 'life_size_games', 
            'theme_room',
            'netflix', 'record_player'
        ],
        bathroom: [
            'bathroom_essentials', 'bath_towel', 'bathtub', 'body_soap', 'conditioner', 
            'hair_dryer', 'hot_water', 'shampoo', 'shower_gel', 'toilet_paper', 
            'walk_in_shower'
        ],
        bedroom_laundry: [
            'bedroom_comforts', 'room_darkening_shades', 'wardrobe_or_closet', 
            'washer', 'dryer'
        ],
        heating_cooling: [
            'ac', 'heating', 'ceiling_fan', 'portable_fans', 'fireplace'
        ],
        home_safety: [
            'smoke_detector', 'carbon_monoxide_detector', 'fire_extinguisher', 
            'first_aid_kit', 'long_term_stays_allowed', 'twenty_four_hour_checkin'
        ],
        kitchen_dining: [
            'kitchen', 'full_kitchen', 'kitchenette', 'cooking_basics', 'dishes_and_silverware', 
            'dishwasher', 'microwave', 'oven', 'stove', 'refrigerator', 'freezer', 
            'mini_fridge', 'coffee_maker', 'coffee', 'keurig_coffee_machine', 'toaster', 
            'blender', 'baking_sheet', 'dining_table', 'formal_dining_area', 'wine_glasses', 
            'hot_water_kettle'
        ],
        location_features: [
            'private_entrance', 'private_living_room', 'single_level_home', 
            'home_step_free_access', 'disabled_parking_spot', 'laundromat_nearby','pool', 'gym', 'exercise_equipment', 'resort_access', 'playground'
        ],
        outdoors: [
            'patio', 'patio_or_belcony', 'garden_or_backyard', 'outdoor_seating', 
            'bbq_area', 'fire_pit', 'alfresco_dining', 'barbeque_utensils'
        ],
        parking_facilities: [
            'free_parking', 'outdoor_parking', 'street_parking', 'paid_parking_on_premises'
        ],
        family_friendly: [
             'childrens_dinnerware', 'childrens_books_and_toys', 'crib', 'pack_n_play_travel_crib', 'high_chair', 'stair_gates', 
            'child_safety_outlet_covers'
        ]
    }

    const amenitiesRef = ref<HTMLElement | null>(null)

    // map each amenity to a FontAwesome icon name (or array for prefixes)
    useIcon(Snowflake, ['ac', 'refrigerator', 'mini_fridge', 'freezer'])
    useIcon(UtensilsCrossed, [
        'alfresco_dining',
        'barbeque_utensils', 
        'dishes_and_silverware',
    ])
    useIcon(HandPlatter, ['formal_dining_area'])
    useIcon(ChefHat, ['baking_sheet','cooking_basics',])
    useIcon(CookingPot, ['kitchen', 'full_kitchen'])
    useIcon(Gamepad2, ['arcade_machine', 'game_console'])
    useIcon(PuzzleIcon, ['board_games', 'life_size_games', 'theme_room'])
    useIcon(Sparkles, [ 'cleaning_products', 'hair_dryer'])
    useIcon(Book, ['books'])
    useIcon(Fan, ['ceiling_fan', 'portable_fans'])
    useIcon(Coffee, ['coffee', 'coffee_maker', 'keurig_coffee_machine'])
    useIcon(Shirt, ['hangers', 'washer', 'wardrobe_or_closet', 'iron'])
    useIcon(Table, ['dining_table'])
    useIcon(LifeBuoy, ['essentials',])  
    useIcon(Tally4, ['stair_gates'])
    useIcon(WashingMachine, ['dishwasher', 'dryer', 'laundromat_nearby'])
    useIcon(Microwave, ['microwave', 'toaster', 'oven'])
    useIcon(Flame, ['bbq_area', 'fireplace', 'heating', 'fire_pit', 'stove'])
    useIcon(FireExtinguisher, ['fire_extinguisher'])
    useIcon(Heart, ['first_aid_kit'])
    useIcon(ParkingCircle, ['free_parking', 'outdoor_parking', 'street_parking', 'paid_parking_on_premises'])
    useIcon(Dumbbell, ['gym', 'exercise_equipment'])
    useIcon(Blend, ['blender'])
    useIcon(Laptop, ['laptop_friendly_workspace'])
    useIcon(Bath, ['bathtub', 'hot_water'])
    useIcon(Armchair, ['high_chair', 'outdoor_seating'])
    useIcon(Waves, ['pool'])
    useIcon(Tv, ['tv', 'smart_tv', 'netflix'])
    useIcon(Wine, ['wine_glasses'])
    useIcon(Wifi, ['wireless_internet', 'internet'])
    useIcon(BabyIcon, ['crib', 'pack_n_play_travel_crib', 'childrens_books_and_toys', 'childrens_dinnerware'])
    useIcon(Users, ['playground'])
    useIcon(Check, ['twenty_four_hour_checkin'])
    useIcon(Lightbulb, [
        'garden_or_backyard',
        'patio',
        'patio_or_balcony', 
        'room_darkening_shades',
    ])
    useIcon(SoapDispenserDroplet, ['conditioner', 'body_soap', 'shampoo', 'shower_gel'])
    useIcon(DoorClosed, ['long_term_stays_allowed', 'private_entrance'])
    useIcon(Zap, ['carbon_monoxide_detector'])
    useIcon(Sofa, ['private_living_room'])
    useIcon(ShowerHead, ['bathroom_essentials', 'bath_towel', 'walk_in_shower'])
    useIcon(Droplets, ['toilet_paper'])
    useIcon(Bed, ['bed_linens', 'bedroom_comforts', 'extra_pillows_and_blankets'])
    useIcon(AlertTriangle, ['smoke_detector'])
    useIcon(Home, ['single_level_home', 'home_step_free_access', 'disabled_parking_spot'])
    useIcon(Trees, ['patio_or_belcony', 'outdoor_seating'])
    useIcon(ChefHat, ['kitchenette', 'hot_water_kettle'])
    useIcon(Shield, ['resort_access'])
    useIcon(Music, ['record_player'])
    useIcon(Wind, ['portable_fans'])

    const defaultIcon = Circle

    function getIcon(amenity: string) {
        return iconMap[amenity] || defaultIcon
    }

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

const visibleAmenities = computed(() => {
    const amenities = categorizedAmenities.value
    return expanded.value ? amenities : amenities.slice(0, 16)
})

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
const categoryLabels = {
    all: 'All Amenities',
    common: 'Common',
    bathroom: 'Bathroom',
    bedroom_laundry: 'Bedroom & Laundry',
    heating_cooling: 'Heating & Cooling',
    home_safety: 'Home Safety',
    kitchen_dining: 'Kitchen',
    location_features: 'Location Features',
    outdoors: 'Outdoors',
    parking_facilities: 'Parking & Facilities',
    family_friendly: 'Family Friendly'
}

// Get count for each category
const getCategoryCount = (category: string) => {
    if (category === 'all') return props.amenities.length
    const categoryAmenities = amenityCategories[category as keyof typeof amenityCategories] || []
    return props.amenities.filter(amenity => categoryAmenities.includes(amenity)).length
}
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
            <component :is="getIcon(item)" class="icon" />
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
    scroll-margin-top: 100px;
    scroll-behavior: smooth;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    justify-content: space-between;
    
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
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 1rem 2rem;
    list-style: none;
    padding: 0 3rem;
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
</style>