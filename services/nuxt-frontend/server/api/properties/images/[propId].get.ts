export default defineCachedEventHandler(async (event) =>{
    const {propId} = event.context.params! 
    const { apiBase } = useRuntimeConfig()
    return await $fetch(`${apiBase}/api_properties/${propId}/images`)
},
{
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})