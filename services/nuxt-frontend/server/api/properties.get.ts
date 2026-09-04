export default defineCachedEventHandler(async ()=> {
    const { apiBase } = useRuntimeConfig()
    const endpoint = apiBase.includes('localhost') ? '/properties' : '/api_properties'
    return await $fetch(`${apiBase}${endpoint}`)
}, {
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})