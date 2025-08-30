export default defineCachedEventHandler(async (event) =>{
    const {propId} = event.context.params! 
    const { apiBase } = useRuntimeConfig()
    return await $fetch(`${apiBase}/api_properties/${propId}/reviews`)
},
{
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})