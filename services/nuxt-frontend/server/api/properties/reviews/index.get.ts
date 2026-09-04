export default defineCachedEventHandler(async (event) => {
    const { apiBase } = useRuntimeConfig()
    const query = getQuery(event)
    const limit = query.limit ?? 10
    const rating = query.rating ?? 5
    const endpoint = apiBase.includes('localhost')
        ? '/properties/reviews/aggregate'
        : '/api_properties/reviews/aggregate'
    return await $fetch(`${apiBase}${endpoint}?limit=${limit}&rating=${rating}`)
}, {
    maxAge: 60,
    staleMaxAge: 300,
    swr: true
})
