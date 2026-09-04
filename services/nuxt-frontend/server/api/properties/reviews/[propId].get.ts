export default defineCachedEventHandler(async (event) =>{
    const {propId} = event.context.params! 
    const { apiBase } = useRuntimeConfig()
    const endpoint = apiBase.includes('localhost')
        ? `/properties/${propId}/reviews`
        : `/api_properties/${propId}/reviews`
    return await $fetch(`${apiBase}${endpoint}`)
},
{
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})