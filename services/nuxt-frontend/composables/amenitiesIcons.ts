import {
  Check, Snowflake, UtensilsCrossed, Gamepad2, Sparkles, Book, Fan, Coffee, SoapDispenserDroplet,
  Table, Package, Flame, FireExtinguisher, Heart, Car, Dumbbell, Blend, Laptop, Bath, Armchair,
  Waves, Tv, Wine, Wifi, Baby as BabyIcon, Key, Lightbulb, DoorClosed, Zap, Sofa, Bed, AlertTriangle,
  PuzzleIcon, Circle, Home, Shirt, Droplets, Wind, ShowerHead, Microwave, WashingMachine, ChefHat,
  Shield, Tally4, MapPin, Trees, ParkingCircle, Music, Users, Mic, CookingPot, HandPlatter, LifeBuoy
} from 'lucide-vue-next'

const iconMap: Record<string, any> = {}

function useIcon(icon: any, keys: string[]) {
  keys.forEach(key => {
    iconMap[key] = icon
  })
}

// Map icons to amenities
useIcon(Snowflake, ['ac', 'refrigerator', 'mini_fridge', 'freezer'])
useIcon(UtensilsCrossed, ['alfresco_dining', 'barbeque_utensils', 'dishes_and_silverware'])
useIcon(HandPlatter, ['formal_dining_area'])
useIcon(ChefHat, ['baking_sheet', 'cooking_basics'])
useIcon(CookingPot, ['kitchen', 'full_kitchen'])
useIcon(Gamepad2, ['arcade_machine', 'game_console'])
useIcon(PuzzleIcon, ['board_games', 'life_size_games', 'theme_room'])
useIcon(Sparkles, ['cleaning_products', 'hair_dryer'])
useIcon(Book, ['books'])
useIcon(Fan, ['ceiling_fan', 'portable_fans'])
useIcon(Coffee, ['coffee', 'coffee_maker', 'keurig_coffee_machine'])
useIcon(Shirt, ['hangers', 'washer', 'wardrobe_or_closet', 'iron'])
useIcon(Table, ['dining_table'])
useIcon(LifeBuoy, ['essentials'])
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
useIcon(Lightbulb, ['garden_or_backyard', 'patio', 'patio_or_balcony', 'room_darkening_shades'])
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

export const amenityCategories = {
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

export const categoryLabels = {
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

export function getAmenityIcon(amenity: string) {
  return iconMap[amenity] || defaultIcon
}