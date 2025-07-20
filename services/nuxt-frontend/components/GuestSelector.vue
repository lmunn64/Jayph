<!-- 
    Guest Selector component
    contains:
        - dropdown sub-menu for selection of adults, children,
            infants, and pets
        - each value linked to interface in parent
        - control via increment and decrememnt buttons
        - names of values and short descriptions for each
-->

<script setup lang="ts">
    const props = defineProps<{ modelValue: Record<string, number> }>()
    const emit = defineEmits<{ (e: 'update:modelValue', val: Record<string, number>): void }>()

    // guest types and descriptions
    const options = [
        { name: 'Adults', description: 'Ages 13 or above', key: 'adults' },
        { name: 'Children', description: 'Ages 2–12', key: 'children' },
        { name: 'Infants', description: 'Under 2', key: 'infants' },
        { name: 'Pets', description: 'Not including service animals', key: 'pets' }
    ]

    // functions to change value of guests
    function increment(key: string) {
        emit('update:modelValue', { ...props.modelValue, [key]: props.modelValue[key] + 1 })
    }
    function decrement(key: string) {
        // must have at least one adult
        const min = key === 'adults' ? 1 : 0
        if (props.modelValue[key] > min) {
            emit('update:modelValue', { ...props.modelValue, [key]: props.modelValue[key] - 1 })
        }
    }
</script>

<template>
    <div v-for="option in options" :key="option.name" class="selector-row">
    <div class="info">
      <h4>{{ option.name }}</h4>
      <p>{{ option.description }}</p>
    </div>
    <div class="counter">
      <button @click="decrement(option.key)">-</button>
      <span>{{ modelValue[option.key] }}</span>
      <button @click="increment(option.key)">+</button>
    </div>
  </div>
</template>

<style scoped>
    .selector-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1rem;
    }

    .selector-row:last-child {
        border-bottom: none;
    }

    .info h4 {
        margin: 0;
        font-size: 1rem;
        color: var(--text-color-dark, #333);
    }

    .info p {
        margin: 4px 0 0;
        font-size: 0.7rem;
        color: var(--text-color-muted, #666);
    }

    .counter {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .counter button {
        width: 32px;
        height: 32px;
        background: none;
        border: 1px solid var(--border-color, #ccc);
        border-radius: 50%;
        font-size: 1rem;
        color: var(--text-color-dark, #333);
        cursor: pointer;
        transition: background 0.2s;
    }

    .counter button:hover {
    background: var(--highlight-color, #eee);
    color: var(--text-color-light);
    }

    .counter span {
    width: 24px;
    text-align: center;
    font-size: 1rem;
    color: var(--text-color-dark, #333);
    }
</style>