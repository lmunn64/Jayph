<!-- 
    Amenities component
    contains:
        - grid-style list of amenities
        - obtained through array of amenities on api call
        - manually-mapped svg icons for each amenity (some have default to circle)
        - cut to 4 rows, 'show all' button, expands to whole list
-->

<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import {
        faCheck,
        faSnowflake,
        faUtensils,
        faGamepad,
        faBroom,
        faBook,
        faFan,
        faCoffee,
        faBaby,
        faTable,
        faBoxOpen,
        faFire,
        faFireExtinguisher,
        faFirstAid,
        faCar,
        faDumbbell,
        faBlender,
        faTshirt,
        faLaptop,
        faHotTub,
        faChair,
        faSwimmer,
        faTv,
        faWineGlass,
        faWifi,
        faChild,
        faPaw,
        faKey,
        faLightbulb,
        faSoap,
        faDoorClosed,
        faBolt,
        faCouch,
        faBed,
        faExclamationTriangle,
        faPuzzlePiece,
        faCircle,
        faFireAlt,
        faBathtub,
        faBath,
        faToiletPaper,
        faKitchenSet,
        faCutlery,
    } from '@fortawesome/free-solid-svg-icons'

    const props = defineProps<{
    amenities: string[]
    }>()

    const iconMap: Record<string, any> = {}

    function useIcon(icon: any, keys: string[]) {
        keys.forEach(key => {
            iconMap[key] = icon
        })
    }

    // map each amenity to a FontAwesome icon name (or array for prefixes)
    useIcon(faSnowflake, ['ac', 'refrigerator', 'mini_fridge', 'freezer'])
    useIcon(faUtensils, [
    'alfresco_dining',
    'barbeque_utensils',
    'cooking_basics',
    'dishes_and_silverware',
    'oven', 'kitchen', 'full_kitchen', 'formal_dining_area'
    ])
    useIcon(faGamepad, ['arcade_machine', 'game_console'])
    useIcon(faPuzzlePiece, ['board_games', 'life_size_games', 'theme_room'])
    useIcon(faBroom, ['baking_sheet', 'cleaning_products', 'hair_dryer'])
    useIcon(faBook, ['books'])
    useIcon(faFan, ['ceiling_fan', 'portable_fans'])
    useIcon(faCoffee, ['coffee', 'coffee_maker'])
    useIcon(faTshirt, ['hangers', 'washer', 'wardrobe_or_closet', 'iron', 'laundromat_nearby'])
    useIcon(faTable, ['dining_table'])
    useIcon(faBoxOpen, [
    'dishwasher',
    'dryer',
    'essentials',
    'microwave',
    'stair_gates',
    'toaster',
    ])
    useIcon(faFireAlt, ['bbq_area', 'fireplace', 'heating','fire_pit'])
    useIcon(faFireExtinguisher, ['fire_extinguisher'])
    useIcon(faFirstAid, ['first_aid_kit'])
    useIcon(faCar, ['free_parking', 'outdoor_parking', 'street_parking'])
    useIcon(faDumbbell, ['gym'])
    useIcon(faBlender, ['blender'])
    useIcon(faLaptop, ['laptop_friendly_workspace'])
    useIcon(faHotTub, ['bathtub', 'hot_water'])
    useIcon(faChair, ['high_chair', 'outdoor_seating'])
    useIcon(faSwimmer, ['pool'])
    useIcon(faTv, ['tv', 'smart_tv'])
    useIcon(faWineGlass, ['wine_glasses'])
    useIcon(faWifi, ['wireless_internet', 'internet'])
    useIcon(faChild, ['crib', 'pack_n_play_travel_crib'])
    useIcon(faPaw, ['playground'])
    useIcon(faKey, ['twenty_four_hour_checkin'])
    useIcon(faLightbulb, [
    'garden_or_backyard',
    'patio',
    'patio_or_balcony',
    'room_darkening_shades',
    ])
    useIcon(faSoap, ['conditioner', 'body_soap', 'shampoo', 'shower_gel']) 
    useIcon(faDoorClosed, ['long_term_stays_allowed', 'private_entrance'])
    useIcon(faBolt, ['carbon_monoxide_detector'])
    useIcon(faCouch, ['private_living_room'])
    useIcon(faBathtub, ['bathroom_essentials', 'bath_towel', 'walk_in_shower'])
    useIcon(faToiletPaper, ['toilet_paper'])
    useIcon(faBed, ['bed_linens','bedroom_comforts', 'extra_pillows_and_blankets'])
    useIcon(faExclamationTriangle, ['smoke_detector'])


    // fallback icon if amenity not found
    const defaultIcon = faCircle

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
            twenty_four_hour_checkin: "Twenty-Four Hour Check-In",
            walk_in_shower: "Walk-In Shower"
        }

        if (customMap[text]) return customMap[text]

        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    const expanded = ref(false)

    const visibleAmenities = computed(() => {
        return expanded.value ? props.amenities : props.amenities.slice(0, 16)
    })
</script>

<template>
    <ul class="amenities-grid">
        <li v-for="item in visibleAmenities" :key="item" class="amenity-item">
        <font-awesome-icon :icon="getIcon(item)" class="icon" />
        <span class="amenity-text">{{ formatAmenity(item) }}</span>
        </li>
    </ul>
    <button
        v-if="props.amenities.length > 16"
        class="toggle-btn"
        @click="expanded = !expanded"
        >
        {{ expanded ? 'Show less' : 'Show all amenities' }}
    </button>
</template>

<style scoped>

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem 2rem;
  list-style: none;
  padding: 0 3rem;
  margin-top: 1rem;
}

.amenity-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
}

.icon {
  color: var(--accent-color);
  margin-right: 0.75rem;
}
.toggle-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color, #ccc);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}
</style>