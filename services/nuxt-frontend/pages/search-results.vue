<script setup lang="ts">

    import { SearchCodeIcon } from 'lucide-vue-next'
    import { usePropertyStore } from '~/stores/properties'
    import type { SearchedProperty, Property, Property_wTotal } from '~/types/property'
    const propertyStore = usePropertyStore()

    await propertyStore.fetchProperties()

    const route = useRoute()

    const searchedProperties = ref<SearchedProperty[]>([])

    const loading = ref(true)
    let abort: AbortController | null = null

    // get the query value in url
    function pickQueryValue(q: Record<string, any>, ...keys: string[]): string {
        for (const k of keys) {
            const v = q[k]
            if (v !== undefined && v !== null && v !== '') {
            return Array.isArray(v) ? v[0] : String(v)
            }
        }
        return ''
    }
    
    const checkinDate = computed(() =>
        pickQueryValue(route.query as Record<string, any>, 'start_date')
    )

    const checkoutDate = computed(() =>
        pickQueryValue(route.query as Record<string, any>, 'end_date')
    )

    const location = computed(() =>
        pickQueryValue(route.query as Record<string, any>, 'location')
    )
    

    const adults = computed<number | undefined>(() => {
        const v = pickQueryValue(route.query as Record<string, any>, 'adults')
        return v ? Number(v) : undefined
    })

    const children = computed<number | undefined>(() => {
        const v = pickQueryValue(route.query as Record<string, any>, 'children')
        return v ? Number(v) : undefined
    })

    const infants = computed<number | undefined>(() => {
        const v = pickQueryValue(route.query as Record<string, any>, 'infants')
        return v ? Number(v) : undefined
    })

    const pets = computed<number | undefined>(() => {
        const v = pickQueryValue(route.query as Record<string, any>, 'pets')
        return v ? Number(v) : undefined
    })

    async function fetchSearchedProperties() {
        loading.value = true
        if (abort) abort.abort()
        abort = new AbortController()
        try {
            console.log('Fetching search with params:', route.query)
            // Forward all current query params
            const data = await $fetch<SearchedProperty[]>('/api/properties/search', {
                params: route.query,
                signal: abort.signal
            })
            searchedProperties.value = data
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Search fetch failed', error)
            }
        } finally {
            if (!abort?.signal.aborted) loading.value = false
        }
    }
    // properties obtained from search including all property info
    // const enrichedProperties = computed<Property_wTotal[]>(() => {
    //     return searchedProperties.value.map(sp => {
    //         const fullProperty = propertyStore.properties.find(p => p.id === sp.uuid)
    //         return fullProperty ? {
    //             property: fullProperty,
    //             total_before_taxes: String(sp.total_before_taxes),
    //         } : undefined
    //     }).filter(p => p !== undefined)
    // })


    // all other properties not available in search
    // const missingProperties = computed<Property_wTotal[]>(() => {
    //     return propertyStore.properties
    //     .filter(p => !searchedProperties.value.map(sp => sp.uuid).includes(p.id))
    //     .map(p => ({
    //         property: p,
    //         total_before_taxes: '',
    //     }))
    // })

    // temporary fix - remove unfiltered properties from improper location query
    const enrichedProperties = computed<Property_wTotal[]>(() => {
        const qLocation = (location?.value ?? '').toString().trim().toLowerCase()
        return searchedProperties.value.map(sp => {
            const fullProperty = propertyStore.properties.find(p => p.id === sp.uuid)
            if (!fullProperty) return undefined

            if (qLocation) {
                const propCity = String(fullProperty.coordinates?.city ?? '')
                    .trim()
                    .toLowerCase()
                if (propCity !== qLocation) return undefined
            }

            return {
                property: fullProperty,
                total_before_taxes: String(sp.total_before_taxes),
            }
        }).filter((p): p is Property_wTotal => p !== undefined)
    })

    const missingProperties = computed<Property_wTotal[]>(() => {
        const includedIds = new Set(enrichedProperties.value.map(ep => ep.property.id))
        return propertyStore.properties
            .filter(p => !includedIds.has(p.id))
            .map(p => ({
                property: p,
                total_before_taxes: '',
            }))
    })

    watch(() => route.query, () => {
        fetchSearchedProperties()
    }, { immediate: true })

    onUnmounted(() => abort?.abort())
</script>

<template>
    <SearchCompsListingSearch
      :location="location"
      :checkinDate="checkinDate"
      :checkoutDate="checkoutDate"
      :adults="adults"
      :children="children"
      :infants="infants"
      :pets="pets"
    />
    <div class="wrapper">
        <!-- display property listings and map of all results side-by-side -->
        <SearchCompsSearchResultProps :enrichedProperties="enrichedProperties ?? []" :missingProperties = "missingProperties ?? []" :loading="loading"/>
        <SearchCompsSearchResultMap :enrichedProperties="enrichedProperties" :missingProperties = "missingProperties ?? []" :loading="loading"/>
    </div>
</template>

<style scoped>
.title {
    padding-inline: 6rem;
}
.wrapper {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    height: 90vh;
    padding: 20px 60px;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
 }
 @media (max-width: 850px) {
    .wrapper {
        flex-direction: column;
        padding: 10px 30px; 
        height: auto;
    }
 }
  @media (max-width: 500px) {
    .wrapper {
        padding: 0px 20px;  
        height: auto;
    }
 }
</style>